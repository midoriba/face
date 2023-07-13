from flask import Flask
import openai
from flask import request
from flask_cors import CORS
import re
import json
import requests as rq
import json
import base64

app = Flask(__name__)
CORS(app, resources={r'/api/*':{'origins':['http://127.0.0.1:3000', 'http://localhost:3000']}})

with open('prompts/emotion.txt', encoding='utf-8', mode='r') as f:
    emotion_prompt_template = f.read()

@app.route('/api/sendchat', methods=['POST'])
def send_chat():
    print(f'send chat: ', request.json)
    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{'role':'system', 'content':'あなたは私の友達です。私の話に相槌をうってください。'}]+[{'role':i['author'], 'content':i['content']} for i in request.json]
    )
    chat_response = res["choices"][0]["message"]["content"]
    
    print(f'respond chat: "{chat_response}"')
    
    emotion_prompt = emotion_prompt_template.format(chat_response)
    print(f'estimate emotion: "{emotion_prompt}')
    res = openai.Completion.create(
        model="text-davinci-003",
        prompt=emotion_prompt,
        max_tokens=70,
        temperature=0.7
    )
    emotion_response = res["choices"][0]["text"]
    print(f'respond emotion: {emotion_response}')
    emotion = json.loads(re.search('{.+}', emotion_response).group())
    print(f'emotion json: {emotion}')
    with open('audio_setting.txt', encoding='utf-8', mode='r') as f:
        audio_id = int(f.read().strip())
    # 42
    audio = speak(chat_response, audio_id)
    return {"content":chat_response, "emotion":emotion, "audio":audio}

def speak(text, speaker=1):
    url = 'http://192.168.10.107:50021/'
    params = {'text':text, 'speaker':speaker}
    response_query = rq.post(url+'audio_query', params=params)
    headers = {'Content-Type': 'application/json',}
    response_audio = rq.post(
        url+'synthesis',
        headers=headers,
        params=params,
        data=json.dumps(response_query.json())
    )
    audio_b64 = base64.b64encode(response_audio.content).decode()
    return audio_b64
if(__name__ == '__main__'):
    app.run()