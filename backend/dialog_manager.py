from langchain_openai import ChatOpenAI
from langchain.memory import ChatMessageHistory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

class DialogManager:
    pass

class SimpleGPTDialogManager():
    def __init__(self):
        self.llm = ChatOpenAI()
        self.history = ChatMessageHistory()
        self.chat_prompt = ChatPromptTemplate.from_messages([
            MessagesPlaceholder(variable_name='conversation')
        ])
        
