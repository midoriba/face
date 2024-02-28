from fastapi import FastAPI
from pydantic import BaseModel
from dialog_manager import DialogManager
from typing import Union


class DialogMessage(BaseModel):
    role: str
    content: str


class DialogData(BaseModel):
    dialog_id = str
    user_message: DialogMessage
    history: Union[list[DialogMessage], None] = None

   
app = FastAPI()

dm: DialogManager = DialogManager()

@app.post('/api/sendchat')
async def send_chat(dialog_data: DialogData):
    response = dm.respond(dialog_data)
    return response

@app.get('/api/start')
async def start():
    response = dm.start()
    return response