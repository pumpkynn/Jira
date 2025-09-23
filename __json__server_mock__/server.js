const express = require('express')
const app = express()
const port = 3001

// 解析 JSON 请求体
app.use(express.json())

// 添加 CORS 支持
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 导入你的中间件
const loginMiddleware = require('./middleware.js')

// 使用你的中间件
app.use(loginMiddleware)

// 模拟数据
const db = require('./db.json')

// 提供 API 端点
app.get('/users', (req, res) => {
  res.json(db.users)
})

app.get('/projects', (req, res) => {
  res.json(db.projects)
})

// 如果中间件没有处理登录请求，则返回默认数据
app.get('/login', (req, res) => {
  res.json(db.login)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Login endpoint: POST http://localhost:${port}/login`)
  console.log(`Users endpoint: GET http://localhost:${port}/users`)
  console.log(`Projects endpoint: GET http://localhost:${port}/projects`)
})
