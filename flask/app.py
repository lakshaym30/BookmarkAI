import flask
import lancedb
import openai
import langchain
# import clip
import torch
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import LanceDB
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import os
import datetime
from flask import Flask, render_template, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)


from dotenv import dotenv_values
env_vars = dotenv_values('.env')


OPENAI_API_KEY = env_vars['OPENAI_API_KEY']
uri = "~/.lancedb"
db = lancedb.connect(uri)
embeddings = OpenAIEmbeddings( openai_api_key= OPENAI_API_KEY)


if 'text' not in db.table_names():
    table = db.create_table("text", data=[
        {"vector": embeddings.embed_query("Hello World"), "text": "Hello World", "id": "1"}
    ])
chat = ChatOpenAI(temperature=0, openai_api_key= OPENAI_API_KEY)
app = Flask(__name__)



# Route for "/" for a web-based interface to this micro-service:
@app.route('/')
def index():
  return "Hello, World"

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')

    return response

# Handle OPTIONS request for CORS preflight
@app.route('/store', methods=['OPTIONS'])
def handle_options():
    response = jsonify({'message': 'Preflight request received'})
    # response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    # response.headers.add('Access-Control-Allow-Methods', 'POST')
    print('Testing')
    return response


@app.route('/store', methods = ['POST'])
def store_embedding():
    json_data = request.get_json()
    print(json_data['raw_text'][:50],'\n\nURL: ', json_data['url'])
    text = json_data['raw_text']
    text_metadata = {"time": datetime.datetime.now().timestamp(), "url": json_data['url']}
    table = db.open_table('text')
    document = Document(page_content=text, metadata=text_metadata)
    # chunks = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0).split_documents([document])
    # print(len(chunks))
    # print(chunks[0])
    arr = text.split(' ')
    text_documents = []
    for i in range(0, len(arr), 1000):
        chunk = ' '.join(arr[i:i+1000])
        text_documents.append(Document(page_content=chunk, metadata=text_metadata))
    print(len(text_documents))
    docsearch = LanceDB.from_documents(text_documents, embeddings, connection=table)
    
    return jsonify({'message': 'Preflight request received'}), 200

# use curl -X POST -H "Content-Type: application/json" -d '{"query": "basketball"}' http://127.0.0.1:5000/retrieve
# to test this endpoint
@app.route('/retrieve', methods = ['POST'])
def retrieve_embedding():
        query = request.get_json()['query']
        table = db.open_table('text')
        docs = LanceDB(embedding=embeddings, connection=table).similarity_search(query, 5)
        print(docs)
        return [str(d) for d in docs]
   



@app.route('/chat', methods = ['POST'])
def chat():
   def retrieve_embedding(query):
        table = db.open_table('text')
        docs = LanceDB(embedding=embeddings, connection=table).similarity_search(query, 3)

        print(docs)
        return [d.page_content for d in docs]
   
   json = request.get_json()
   query = json['query']
   embeddings = retrieve_embedding(query)
   final_embeddings = ''
   for embedding in embeddings:
       final_embeddings += embedding + '\n'
   final_embeddings -= '\n'
   query = f"{query}\nCONTEXT: {final_embeddings}"
   messages = [
        SystemMessage(content="You are a human assistant that will help users remember about topics from their previous bookmarks"),
        HumanMessage(content=query)
   ]
   chat(messages)
   return 



# # image embedding

# device = "cude" if torch.cude.is_available() else "cpu"
# mode1, preprocess, clip.load("ViT-B/32")

   
if __name__ == '__main__':
    app.run(debug=True)




