from flask import Flask, render_template, request
from flask_cors import *
import openai

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, supports_credentials=True)  # 设置全体跨域
openai.api_key = "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"


@app.route('/')
def index():
    return render_template('index.html')
    # return app.send_static_file('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    ask = request.json.get('text')
    print(ask)
    response = openai.Completion.create(
        engine="davinci",
        prompt=ask,
        max_tokens=2048,
        n=1,
        stop=None,
        temperature=0.7,
    )
    message = response.choices[0].text
    print(message)
    return message


@app.route('/cross')
@cross_origin(supports_credentials=True)  # 设置单条 api 跨域
def hello_pycharm():
    return f'Hello, PyCharm!'


@app.route('/hello')
def hello_world():
    return 'Hello Flask!'


if __name__ == '__main__':
    # 默认为5000端口
    app.run()
    # app.run(port=8000)
