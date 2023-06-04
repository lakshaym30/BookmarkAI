import json
import logging
from typing import AsyncGenerator

from fastapi import APIRouter
from langchain.embeddings import OpenAIEmbeddings
from starlette.responses import StreamingResponse

from models.chat import UserChatMessage, ChatServiceMessage, UserSearchMessage
from services.conversation_service import ConversationService
from utils.db import get_vectorstore

router = APIRouter()
chat_service = ConversationService(vectorstore=get_vectorstore('text', OpenAIEmbeddings()))

logger = logging.getLogger(__name__)


async def sse_generator(messages_generator: AsyncGenerator[ChatServiceMessage, None]):
    async for msg in messages_generator:
        msg_dict = {'chat_response': msg.msg, 'documents': [d.dict() for d in msg.relevant_documents]}
        if msg.done:
            # save to db
            print(f'yielding {msg.json()}')
            yield f"data: {json.dumps(msg_dict)}\n\n"
        else:
            print(f'yielding {msg.json()}')
            yield f"data: {json.dumps(msg_dict)}\n\n"


@router.get('/chat', responses={200: {"content": {"text/event-stream": {}}}})
async def chat(q: str):
    logger.info("chatting")
    completion = chat_service.chat(
        message=q,
    )
    sse = StreamingResponse(sse_generator(completion),
                            media_type='text/event-stream')

    # workaround for app engine
    sse.headers["Cache-Control"] = "no-cache"
    return sse


@router.post('/search')
async def search(message: UserSearchMessage):
    relevant_docs = chat_service.get_context(message.query)
    return [d.dict() for d in relevant_docs]