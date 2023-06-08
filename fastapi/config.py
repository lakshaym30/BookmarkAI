import os

import openai
from dotenv import load_dotenv

load_dotenv()


class Singleton(type):
    """
    Singleton metaclass for ensuring only one instance of a class.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(
                Singleton, cls).__call__(
                *args, **kwargs)
        return cls._instances[cls]


class Config(metaclass=Singleton):
    """
    Configuration class to store the state of bools for different scripts access.
    """

    def __init__(self):
        self.fast_llm_model = os.getenv("FAST_LLM_MODEL", "gpt-3.5-turbo")
        self.smart_llm_model = os.getenv("SMART_LLM_MODEL", "gpt-4-32k")

        self.chunk_size = int(os.getenv("CHUNK_SIZE", 1000))
        self.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", 50))

        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.openai_api_key
        openai.organization = os.getenv("OPENAI_ORGANIZATION")

        self.debug_mode = os.getenv("DEBUG_MODE", "False") == "True"
        self.lancedb_url = os.getenv("LANCEDB_URL", "lancedb")
        self.weaviate_url = os.getenv("WEAVIATE_URL", "weaviate")
