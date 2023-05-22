from flask import Flask
import openai
from flask import request

app = Flask(__name__)
@app.route('/sendchat', methods=['POST'])
def send_chat():
    text = request.form.get('text')
    print('>>>>>>>>>>>>text:', text)
    msg = [
        {"role": "user", "content": text}
    ]
    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=msg
    )
    result = res["choices"][0]["message"]["content"]
    return {"text":result}

if(__name__ == '__main__'):
    app.run()