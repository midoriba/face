import requests as rq
import json
import time

#url = 'http://127.0.0.1:50021/'
url = 'http://192.168.11.163:50021/'
with open('test.txt', encoding='utf-8', mode='r') as f:
    text = f.read().replace('/n', '')
print('text length:', len(text))
params = {'text':text, 'speaker':1}
t1 = time.time()
response_query = rq.post(url+'audio_query', params=params)
t2 = time.time()
headers = {'Content-Type': 'application/json',}
#print(response_query.json())
kana = response_query.json()['kana']
with open('response_query_sample.json', encoding='utf-8', mode='w') as f:
    json.dump(response_query.json(), f, indent=2, ensure_ascii=False)
print('kana length:', len(kana))
t3 = time.time()
response_audio = rq.post(
    url + 'synthesis',
    headers=headers,
    params=params,
    data=json.dumps(response_query.json())
)
t4 = time.time()

print('query:', t2-t1)
print('synthesis:', t4-t3)
print('all:', t4-t1)
with open('audiob.wav', mode='wb') as f:
    f.write(response_audio.content)