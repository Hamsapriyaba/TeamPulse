from flask import Flask, render_template, request, jsonify
import os
import pandas as pd
from extract_text import extract_text_from_pdf, extract_text_from_docx, extract_text_from_txt
from search_files import build_search_index, search_files
from transformers import AutoModelForCausalLM, AutoTokenizer
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Allow users to upload files from anywhere
UPLOAD_FOLDER = os.path.expanduser("~/Uploads")  # Change this path if needed
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"pdf", "docx", "txt", "csv", "xlsx"}

def allowed_file(filename):
    """Check if file type is allowed"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Load GPT-2 Model
model_path = os.path.abspath("~/ISRO_Chatbot_Setup/GPT2_Model")
if os.path.exists(model_path):
    model = AutoModelForCausalLM.from_pretrained(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)
else:
    model, tokenizer = None, None

# Function to extract text from different file formats
def extract_text(file_path):
    try:
        if file_path.endswith(".pdf"):
            return extract_text_from_pdf(file_path)
        elif file_path.endswith(".docx"):
            return extract_text_from_docx(file_path)
        elif file_path.endswith(".txt"):
            return extract_text_from_txt(file_path)
        elif file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
            return df.to_string(index=False)  # Convert CSV to text
        elif file_path.endswith(".xlsx"):
            df = pd.read_excel(file_path)
            return df.to_string(index=False)  # Convert Excel to text
    except Exception as e:
        return f"Error processing {file_path}: {str(e)}"
    return ""

# Load existing documents
docs = []
for file in os.listdir(UPLOAD_FOLDER):
    file_path = os.path.join(UPLOAD_FOLDER, file)
    text = extract_text(file_path)
    if text:
        docs.append(text)

bm25, tokenized_corpus = build_search_index(docs)

# Chatbot response function
def chatbot_response(user_query):
    """Generate a chatbot response either from documents or GPT-2"""
    results = search_files(user_query, bm25, tokenized_corpus, docs)
    
    if results:
        return "\n".join(results[:2])  # Return top 2 results from files
    elif model and tokenizer:
        inputs = tokenizer(user_query, return_tensors="pt")
        output = model.generate(**inputs, max_length=100)
        return tokenizer.decode(output[0], skip_special_tokens=True)
    return "No relevant information found."

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_query = request.json.get("query", "")
    response = chatbot_response(user_query)
    return jsonify({"response": response})

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)  # Secure the filename
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # Process only the newly uploaded file
        new_text = extract_text(file_path)
        if new_text:
            docs.append(new_text)
            global bm25, tokenized_corpus
            bm25, tokenized_corpus = build_search_index(docs)

        return jsonify({"message": f"File '{filename}' uploaded successfully!", "path": file_path})

    return jsonify({"error": "Invalid file type"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
