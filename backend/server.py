from flask import Flask
import openai
from flask import request
from flask_cors import CORS
import re
import json

app = Flask(__name__)
CORS(app, resources={r'/api/*':{'origins':['http://127.0.0.1:3000', 'http://localhost:3000']}})

with open('prompts/emotion.txt', encoding='utf-8', mode='r') as f:
    emotion_prompt_template = f.read()

@app.route('/api/sendchat', methods=['POST'])
def send_chat():
    print(f'send chat: ', request.json)
    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{'role':i['author'], 'content':i['content']} for i in request.json]
    )
    chat_response = res["choices"][0]["message"]["content"]
    
    print(f'respond chat: "{chat_response}"')
    
    emotion_prompt = emotion_prompt_template.format(chat_response)
    print(f'estimate emotion: "{emotion_prompt}')
    res = openai.Completion.create(
        model="text-davinci-003",
        prompt=emotion_prompt,
        max_tokens=140,
        temperature=0.7
    )
    emotion_response = res["choices"][0]["text"]
    print(f'respond emotion: {emotion_response}')
    emotion = json.loads(re.search('{.+}', emotion_response).group())
    print(f'emotion json: {emotion}')
    return {"content":chat_response, "emotion":emotion}

if(__name__ == '__main__'):
    app.run()