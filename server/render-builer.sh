#!/usr/bin/env bash
set -o errexit

# Install system dependencies for OCR
apt-get update && apt-get install -y \
  poppler-utils \
  tesseract-ocr
