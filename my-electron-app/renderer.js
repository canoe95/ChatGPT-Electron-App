// const information = document.getElementById('info');
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping()
  alert(response) // 打印 'pong'
}

func()

const render_send = async () => {
  const data = { text: 'hello' };
  const jsonData = JSON.stringify(data);
  const response = await window.versions.send(jsonData)
  alert(response)
}


const btn = document.getElementById('test');
btn.onclick = render_send
