import flask
import lancedb
import openai
import langchain
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import LanceDB
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain import document
import os
from flask import Flask, render_template, request



uri = "~/.lancedb"
db = lancedb.connect(uri)
app = Flask(__name__)

OPENAI_API_KEY = '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'


# Route for "/" for a web-based interface to this micro-service:
@app.route('/')
def index():
  return "Hello, World"

@app.route('/store', methods = ['POST'])
def store_embedding(content):

    
    json_data = request.get_json()
    text = json_data['raw_text']
    metadata = json_data['metadata']
    document = Document(text, metadata)
    chunks = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0).split_documents(document)
    embeddings = OpenAIEmbeddings()

    table = db.create_table("content", data=[
        {"vector": embeddings.embed_query("Hello World"), "text": "Hello World", "id": "1"}
    ], mode="overwrite")

    docsearch = LanceDB.from_documents(chunks, embeddings, connection=table)



    embedding = embed_func(file_contents)
    
    return embed_func(file_contents)



