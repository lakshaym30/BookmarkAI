from typing import List

from langchain.schema import Document
from pydantic import BaseModel


class ChatServiceMessage(BaseModel):
    done: bool = False
    msg: str = ''
    relevant_documents: List[Document] = []


class UserChatMessage(BaseModel):
    message: str


class UserSearchMessage(BaseModel):
    query: str