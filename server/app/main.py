from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
import os, tempfile, json
import docx, PyPDF2
from dotenv import load_dotenv
from openai import OpenAI
from pdf2image import convert_from_path
import pytesseract

# Load env vars
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="قيّمني - AI Resume Tools")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health check
@app.get("/")
async def root():
    return {"status": "ok", "app": "قيّمني - AI Resume Tools"}


# -----------------------------
# Helpers for text extraction
# -----------------------------
def extract_text_from_pdf(path: str) -> str:
    text = ""
    try:
        with open(path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception:
        pass

    # OCR fallback
    if not text.strip():
        try:
            images = convert_from_path(path)
            for img in images:
                text += pytesseract.image_to_string(img)
        except Exception as e:
            print("OCR failed:", e)
    return text


def extract_text_from_docx(path: str) -> str:
    try:
        d = docx.Document(path)
        return "\n".join(p.text for p in d.paragraphs)
    except Exception:
        return ""


def _parse_json_strict(content: str) -> Dict[str, Any]:
    """Ensure GPT returns valid JSON"""
    s = content.strip()
    if s.startswith("```"):
        s = s.strip("`")
        if s.lower().startswith("json"):
            s = s[4:].strip()
    return json.loads(s)


# -----------------------------
# Resume Feedback Endpoint
# -----------------------------
@app.post("/api/feedback")
async def feedback(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Extract text
    if ext == ".pdf":
        text = extract_text_from_pdf(tmp_path)
    elif ext == ".docx":
        text = extract_text_from_docx(tmp_path)
    elif ext == ".txt":
        with open(tmp_path, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
    else:
        return JSONResponse({"error": "Unsupported file type"}, status_code=400)

    if not text or len(text.strip()) < 40:
        return JSONResponse({"error": "Could not extract readable text"}, status_code=422)

    if not client.api_key:
        return JSONResponse({"error": "OPENAI_API_KEY not set"}, status_code=500)

    try:
        system = "You are a senior recruiter. Provide JSON resume analysis."
        user = f"""
Return JSON with:
- summary
- ats_score (0-100)
- strengths
- gaps
- suggestions
- improved_bullets
- keywords {{hard_skills, soft_skills, role_specific}}
- section_order
- red_flags

RESUME TEXT:
{text}
"""
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
            max_tokens=800,
            temperature=0.4,
        )
        content = resp.choices[0].message.content
        data = _parse_json_strict(content)
        data["preview"] = text[:400]
        return JSONResponse(data)

    except Exception as e:
        return JSONResponse({"error": "OpenAI request failed", "detail": str(e)}, status_code=502)


# -----------------------------
# Cover Letter Generator
# -----------------------------
@app.post("/api/coverletter")
async def cover_letter(file: UploadFile = File(...), job: str = Form(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    if ext == ".pdf":
        resume_text = extract_text_from_pdf(tmp_path)
    elif ext == ".docx":
        resume_text = extract_text_from_docx(tmp_path)
    elif ext == ".txt":
        with open(tmp_path, "r", encoding="utf-8", errors="ignore") as f:
            resume_text = f.read()
    else:
        return JSONResponse({"error": "Unsupported file type"}, status_code=400)

    if not resume_text.strip():
        return JSONResponse({"error": "Resume text empty"}, status_code=422)

    try:
        messages = [
            {"role": "system", "content": "You are a career coach. Write a polished, tailored cover letter."},
            {"role": "user", "content": f"Resume:\n{resume_text}\n\nJob Description:\n{job}\n\nGenerate a strong one-page cover letter."}
        ]
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=600,
            temperature=0.6,
        )
        return {"cover_letter": resp.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# Resume vs Job Match
# -----------------------------
@app.post("/api/jobmatch")
async def job_match(file: UploadFile = File(...), job: str = Form(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    if ext == ".pdf":
        resume_text = extract_text_from_pdf(tmp_path)
    elif ext == ".docx":
        resume_text = extract_text_from_docx(tmp_path)
    elif ext == ".txt":
        with open(tmp_path, "r", encoding="utf-8", errors="ignore") as f:
            resume_text = f.read()
    else:
        return JSONResponse({"error": "Unsupported file type"}, status_code=400)

    if not resume_text.strip():
        return JSONResponse({"error": "Resume text empty"}, status_code=422)

    try:
        messages = [
            {"role": "system", "content": "You are an ATS and recruiter evaluating job fit. Respond in strict JSON only."},
            {"role": "user", "content": f"""
Compare this resume to the job description.
Return JSON with:
- match_score (0-100)
- missing_keywords
- strengths
- weaknesses
- suggestions

RESUME:
{resume_text}

JOB DESCRIPTION:
{job}
"""}
        ]
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=600,
            temperature=0.4,
        )

        content = resp.choices[0].message.content

        # ✅ Parse into JSON instead of raw string
        try:
            data = _parse_json_strict(content)
            return JSONResponse(data)
        except Exception:
            return JSONResponse(
                {"error": "Invalid JSON from model", "raw_output": content},
                status_code=502
            )

    except Exception as e:
        return JSONResponse({"error": "OpenAI request failed", "detail": str(e)}, status_code=502)
