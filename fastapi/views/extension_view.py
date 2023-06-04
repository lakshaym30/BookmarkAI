from datetime import datetime

from fastapi import APIRouter
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document
from langchain.text_splitter import TextSplitter

from models.extension import ExtensionDocument
from utils.db import get_vectorstore

router = APIRouter()


@router.post('/store')
def store(document: ExtensionDocument):
    try:
        vectorstore = get_vectorstore('text', OpenAIEmbeddings())
        chunks = TextSplitter().split_text(document.raw_text)
        chunk_docs = [Document(
            page_content=chunk,
            metadata={
                'url': document.url,
                'time': datetime.now().timestamp()
            }
        ) for chunk in chunks]
        vectorstore.add_documents(chunk_docs)
        return {'success': True}
    except Exception as e:
        return {'success': False, 'error': str(e)}
