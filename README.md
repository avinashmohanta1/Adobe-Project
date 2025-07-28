# 🧠 Round 1A – PDF Heading Extractor (Adobe India Hackathon)

This project is part of **Round 1A** of the Adobe India Hackathon. It extracts the **document title** and **heading structure** (like H1, H2, H3) from PDF files based on font sizes using **PyMuPDF**, and outputs a structured `JSON` outline.

It is fully containerized using **Docker** and automatically processes all PDFs in the `/input` directory.
## ✅ Features

- ✅ Extracts document **title** from first non-empty line of Page 1.
- ✅ Detects headings based on **font size thresholds**:
  - `≥ 18pt` → H1
  - `≥ 14pt` → H2
  - `≥ 11pt` → H3
- ✅ Outputs structured outline in JSON:
```json
{
  "title": "Welcome to the Future",
  "outline": [
    {
      "level": "H1",
      "text": "Introduction",
      "page": 1
    },
    {
      "level": "H2",
      "text": "Objectives",
      "page": 2
    }
  ]
}

```
# 🧠 Round 1B – Persona-Based PDF Section Extractor (Adobe India Hackathon)

This project enhances the basic heading extractor by introducing **persona-driven filtering** and **multilingual support**. It processes PDF files and extracts the most relevant sections based on a defined persona's job-to-be-done, helping personalize content for different user needs.


---

## ✅ Features

- 🔍 Extracts content relevant to a **user persona** using job-related keywords
- 🌐 Detects language and **simulates translation** to English (via `langdetect`)
- 🧠 Assigns **importance scores** based on keyword presence
- 📄 Outputs a clean JSON summarizing all matched sections

---

## 🧠 Example `persona.json`

```json
{
  "persona": "Investment Analyst",
  "job": "Analyze revenue trends, R&D investments, and market positioning strategies"
}
```
📤 Output Format (output/persona_output.json)
json
```
{
  "metadata": {
    "input_documents": ["financial_report.pdf"],
    "persona": "Investment Analyst",
    "job_to_be_done": "Analyze revenue trends, R&D investments, and market positioning strategies",
    "processing_timestamp": "2025-07-28 23:00:00"
  },
  "extracted_sections": [
    {
      "document": "financial_report.pdf",
      "page_number": 4,
      "section_title": "[Translated from de] R&D investment performance in Q2",
      "importance_rank": 2
    },
    {
      "document": "financial_report.pdf",
      "page_number": 7,
      "section_title": "Market positioning strategy against competitors",
      "importance_rank": 3
    }
  ]
}
```
🚀 Round 2 – Futuristic PDF Reader App (Adobe India Hackathon)
This project reimagines traditional PDF reading by combining Adobe PDF Embed API, persona-aware filtering, and a sleek React-based UI. It enhances productivity and comprehension by tailoring document content to specific user roles or goals.

✅ Features
📚 Persona-Driven Content Highlighting
Highlights PDF sections relevant to a selected user persona (e.g., Investment Analyst) using keyword matching.

🧠 Intelligent Document Structuring
Extracts headings (H1, H2, H3) and dynamically builds a clickable document outline for navigation.

🧩 Adobe PDF Embed API Integration
Enables smooth PDF rendering in-browser using Adobe’s SDK.

🧑‍💼 Role-Specific Filtering
Filters large documents to only show content aligned with the user’s job.

⚙️ Modular & Scalable Codebase
Built using React + TypeScript + Tailwind CSS, and deployable via Docker.

🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS

PDF Integration: Adobe PDF Embed API

Build Tool: Vite

Deployment: Docker



