FROM --platform=linux/amd64 python:3.10-slim

WORKDIR /app

COPY . /app

# This line must exist to install dependencies!
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "persona_extractor.py"]
