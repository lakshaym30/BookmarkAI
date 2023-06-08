from typing import List, Dict, Any

import tiktoken
import weaviate
from langchain.schema import Document
from config import Config

config = Config()


class ContextService:
    def __init__(self, client: weaviate.Client):
        self.client = client

    def get_context(self, message: str, user_id: str, certainty: float = 0.8) -> List[Document]:
        relevant_docs = self.__get_relevant_documents(message, user_id, certainty)
        limited_context = self.__limit_context(relevant_docs, 3000)
        return limited_context

    def __get_relevant_documents(self, message: str, user_id: str, certainty: float) -> List[Document]:
        where_filter = {
            "path": ["user_id"],
            "operator": "Equal",
            "valueString": user_id
        }

        res = self.client.query.get(
            "Document", ["title", "url", "content"]
        ).with_where(
            where_filter
        ).with_near_text({
            "concepts": [message],
            "certainty": certainty,
        }).with_additional(
            ['certainty']
        ).do()

        docs: List[Dict[str, Any]] = sorted(
            res['data']['Get']['Document'],
            key=lambda x: x.get('_additional', {}).get('certainty', 0),
            reverse=True
        )

        return [Document(page_content=d.pop('content'), metadata=d) for d in docs]

    @classmethod
    def __limit_context(cls, context: List[Document], token_limit: int) -> List[Document]:
        ctx = []
        used_tokens = 0
        encoding = tiktoken.encoding_for_model(config.fast_llm_model)
        for doc in context:
            tokens = encoding.encode(doc.page_content)
            if used_tokens + len(tokens) > token_limit:
                break
            ctx.append(doc)
            used_tokens += len(tokens)

        return ctx
