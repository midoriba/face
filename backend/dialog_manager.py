from langchain_openai import ChatOpenAI
from langchain.memory import ChatMessageHistory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
import random


class DialogManager:
    pass


class SimpleGPTDialogManager():
    def __init__(self):
        self.llm = ChatOpenAI(model='gpt-3.5-turbo')
        self.history = ChatMessageHistory()
        self.chat_prompt = ChatPromptTemplate.from_messages([
            MessagesPlaceholder(variable_name='conversation')
        ])
        self.chain = self.chat_prompt | self.llm

    
    def respond(self, message):
        resp = self.chain.invoke({'input': message,'conversation': self.history.messages})
        self.history.add_user_message(message)
        self.history.add_ai_message(resp)
        return 
    

    def start(self):
        self.history.clear()
        return {'id': str(random.randint(999)).zfill(4)}
            
