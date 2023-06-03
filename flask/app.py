import flask
import lancedb
import openai
import langchain
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import LanceDB
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import os
from flask import Flask, render_template, request
from dotenv import dotenv_values
env_vars = dotenv_values('.env')


uri = "~/.lancedb"
db = lancedb.connect(uri)
embeddings = OpenAIEmbeddings()

if 'text' not in db.table_names():
    table = db.create_table("text", data=[
        {"vector": embeddings.embed_query("Hello World"), "text": "Hello World", "id": "1"}
    ])
app = Flask(__name__)

OPENAI_API_KEY = env_vars['OPENAI_API_KEY']


# Route for "/" for a web-based interface to this micro-service:
@app.route('/')
def index():
  return "Hello, World"

@app.route('/store', methods = ['POST'])
def store_embedding():
    json_data = request.get_json()
    text = json_data['raw_text']
    metadata = json_data['metadata']
    document = Document(page_content=text, metadata=metadata)
    chunks = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0).split_documents([document])

    docsearch = LanceDB.from_documents(chunks, embeddings, connection=table)
    
    return "Loaded Document Into Table"


@app.route('/retrieve', methods = ['POST'])
def retrieve_embedding():
   json_data = request.get_json()
   query = json_data['query']
   docs = LanceDB(embedding=embeddings, connection=table).similarity_search(query, 3)

   print(docs)
   return [d.page_content for d in docs]



   





