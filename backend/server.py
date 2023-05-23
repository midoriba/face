from flask import Flask
import openai
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/api/*':{'origins':['http://127.0.0.1:3000']}})
@app.route('/api/sendchat', methods=['POST'])
def send_chat():
    text = request.json.get('text')
    print(f'send: "{text}"', request.json)
    msg = [
        {"role": "user", "content": text}
    ]
    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=msg
    )
    result = res["choices"][0]["message"]["content"]
    print(f'respond: "{result}"')
    return {"text":result}

if(__name__ == '__main__'):
    app.run()