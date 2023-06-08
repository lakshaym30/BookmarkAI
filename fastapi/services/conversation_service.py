import asyncio
from typing import AsyncIterator, List, Dict, Any

import weaviate
from langchain import PromptTemplate
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.chat_models import ChatOpenAI
from langchain.schema import BaseMessage, SystemMessage, Document, HumanMessage
from langchain.vectorstores import VectorStore, LanceDB

from config import Config
from models.chat import ChatServiceMessage
from utils.db import get_vectorstore

config = Config()


class ConversationService:
    __system_prompt = """
    You are a helpful, creative, clever, and very friendly assistant. The user will be giving you a QUESTION, 
    and CONTEXT will be provided from a source. You (the assistant) may use information from the preceding conversation or the provided 
    context to answer the question. The assistant can ignore the context if it doesn't help answer the question.

    Use markdown format if beneficial.

    """
    __base_prompt = """
    QUESTION:
    {question}
    CONTEXT:
    {context}
    """

    def __init__(self, vectorstore: VectorStore):
        self.vectorstore = vectorstore

    def _get_system_prompt(self) -> str:
        template = PromptTemplate(template=self.__system_prompt, input_variables=[])
        return template.format()

    def _get_user_prompt(self, question: str, context: str) -> str:
        template = PromptTemplate(template=self.__base_prompt, input_variables=["question", "context"])
        return template.format(question=question, context=context)

    def get_context(self, message: str) -> List[Document]:
        client = get_vectorstore()
        where_filter = {
            "path": ["user_id"],
            "operator": "Equal",
            "valueString": "user1"
        }

        res = client.query.get(
            "Document", ["title", "url", "content"]
        ).with_where(
            where_filter
        ).with_near_text({
            "concepts": [message],
            "certainty": 0.8,
        }).do()

        docs: List[Dict[str, Any]] = res['data']['Get']['Document']

        return [Document(page_content=d.pop('content'), metadata=d) for d in docs]

    @classmethod
    def _format_context(cls, context: List[Document]) -> str:
        return '\n\n'.join([doc.page_content for doc in context])

    def _get_message_generator(self,
                               context: List[Document],
                               user_message: BaseMessage) -> AsyncIterator[str]:
        msg_iterator = AsyncIteratorCallbackHandler()
        llm = ChatOpenAI(
            verbose=True,
            callback_manager=AsyncCallbackManager([msg_iterator]),
            streaming=True,
            model_name=config.fast_llm_model,
        )
        msgs: List[List[BaseMessage]] = [[
            SystemMessage(content=self._get_system_prompt()),
            HumanMessage(content=self._get_user_prompt(
                user_message.content, self._format_context(context),
            )),
        ]]

        asyncio.ensure_future(llm.agenerate(messages=msgs))

        return msg_iterator.aiter()

    async def chat(self, message: str):
        context = self.get_context(message)
        full_response = ''

        token_generator = self._get_message_generator(
            context=context,
            user_message=HumanMessage(content=message),
        )

        # emit content + save it to full_response
        async for chunk in token_generator:
            # content = chunk['choices'][0]['delta'].get('content', '')  # extract the message
            content = chunk
            full_response += content
            if content == '':  # if the message is empty - ignore it
                continue

            yield ChatServiceMessage(msg=content, relevant_documents=context, done=False)

        yield ChatServiceMessage(msg=full_response, relevant_documents=context, done=True)

