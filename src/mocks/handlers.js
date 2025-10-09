import { rest } from 'msw'

export const handlers = [
  // 注册接口
  rest.post('/register', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '1',
          name: 'testuser',
          token: 'mock-token-123'
        }
      })
    )
  }),
  
  // 登录接口
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '1',
          name: 'testuser',
          token: 'mock-token-123'
        }
      })
    )
  })
]
