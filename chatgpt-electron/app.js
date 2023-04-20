// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
// import { app } from 'electron'
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron');
const axios = require("axios").default;
// require('@electron/remote/main').initialize()


const createWindow = () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
      // nodeIntegration: true,
      // contextIsolation: false    // 讓在 preload.js 的定義可以傳遞到 Render Process (React)
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')

  // 通过 axios 请求后端，然后通过 mainWindow.webContents 回送消息给 preload.js 中的监听器
  // preload.js 的监听器收到消息直接渲染前端页面
  axios.defaults.baseURL = 'http://127.0.0.1:5000'
  ipcMain.handle('send', async (event, jsonData) => {
    // send(jsonData)
    // response = await sleep();
    console.log("request arise: " + jsonData)
    axios.post('http://127.0.0.1:5000/chat', jsonData, {
      headers: {
        "Content-Type":"application/json"
      },
    }).then(response => {
      data = response.data
      console.log("receive data: " + data)
      mainWindow.webContents.send('back', data)
    }, error => {
      error = error.message
      console.log('error occur: ', error)
      event.sender.send("back", error)
    })
  })

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('ping', () => 'pong')
  
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。


// 尝试用 net 请求
pre = ''
cur = ''
function send(jsonData){
  const { net } = require('electron')
  const request = net.request({
    headers: { 'Content-Type': 'application/json', },
    method: 'POST',
    url: 'http://127.0.0.1:5000/chat'
  })
  // 发起请求
  request.write(jsonData)

  // console.log("come in the send function")
  request.on('response', response => {
    response.on('data', res => {
      pre = cur
      cur = res.toString()
      // console.log("received: " + msg)
    })
    response.on('end', () => {
      console.log('No more data in response, request end.')
    })
    // console.log(response._data)
  })
  request.end()
  // console.log("out the send function")
}

// let fun = () => console.log("current: " + msg);
let sleep = function(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cur);
    }, 1000);
  });
}
