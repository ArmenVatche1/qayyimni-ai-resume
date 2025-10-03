let API_BASE_URL = "";

if (process.env.NODE_ENV === "production") {
  API_BASE_URL = "https://qayyimni-ai-resume.onrender.com"; // Render backend URL
} else {
  API_BASE_URL = "http://127.0.0.1:8000"; // Local backend
}

export default API_BASE_URL;
