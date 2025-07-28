import fitz
import json
import os
import datetime
from langdetect import detect

# Mock translation (since we can't use online translators)
def translate_to_english(text):
    try:
        lang = detect(text)
        if lang != "en":
            # Simulate translation
            return "[Translated from {}] {}".format(lang, text)
        return text
    except:
        return text  # fallback

# Load persona
with open("persona.json", "r", encoding="utf-8") as f:
    persona_data = json.load(f)

persona = persona_data["persona"]
job = persona_data.get("job") or persona_data.get("job_to_be_done")

keywords = [k.lower() for k in job.split()]

INPUT_DIR = "input"
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

output = {
    "metadata": {
        "input_documents": [],
        "persona": persona,
        "job_to_be_done": job,
        "processing_timestamp": str(datetime.datetime.now())
    },
    "extracted_sections": []
}

for filename in os.listdir(INPUT_DIR):
    if not filename.lower().endswith(".pdf"):
        continue

    output["metadata"]["input_documents"].append(filename)
    filepath = os.path.join(INPUT_DIR, filename)
    doc = fitz.open(filepath)

    for page_num, page in enumerate(doc, 1):
        blocks = page.get_text("blocks")
        for block in blocks:
            text = block[4].strip()
            if len(text) < 20:
                continue

            translated_text = translate_to_english(text)
            score = sum(kw in translated_text.lower() for kw in keywords)

            if score > 0:
                output["extracted_sections"].append({
                    "document": filename,
                    "page_number": page_num,
                    "section_title": translated_text,
                    "importance_rank": score
                })

# Save output
with open(os.path.join(OUTPUT_DIR, "persona_output.json"), "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("✅ Extraction complete with multilingual support!")
