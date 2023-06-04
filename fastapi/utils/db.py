import lancedb
from langchain.embeddings.base import Embeddings
from langchain.vectorstores import VectorStore, LanceDB

from config import Config


def get_vectorstore(table_name: str, embedding: Embeddings) -> VectorStore:
    config = Config()
    db = lancedb.connect(config.lancdeb_url)
    if not table_name in db.table_names():
        table = db.create_table(table_name)
    else:
        table = db.open_table(table_name)

    vectorstore = LanceDB(embedding=embedding, connection=table)
    return vectorstore