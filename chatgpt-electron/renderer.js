// const information = document.getElementById('info');
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping()
  alert(response) // 打印 'pong'
}

// func()

//将消息显示在网页上
function setMessageInnerHTML(name, msg) {
  document.getElementById("message").innerHTML += "<strong>" + name + ":</strong><br>"
  document.getElementById('message').innerHTML += msg + '<br><br>';
}

const renderer_send = async () => {
  // 获取页面信息
  let a = "Dear You"
	let t = document.getElementById("text").value;
  setMessageInnerHTML(a, t)
  document.getElementById("text").value = ""

  // 封装数据
  // console.log(c)
  const data = { text: t };
  const jsonData = JSON.stringify(data);

  // 调用 preload.js 暴露的 send 函数
  window.versions.send(jsonData)
}

const btn = document.getElementById('send');
btn.onclick = renderer_send



