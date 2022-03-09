import { Hono } from 'hono'
import { SHA256 } from 'crypto-js'
import { basicAuth } from 'hono/basic-auth'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())
app.use(
  '/auth/*',
  basicAuth({
    username: 'compute',
    password: 'edge',
    hashFunction: (m: string) => SHA256(m).toString(),
  })
)

app.get('/', (c) => c.text('Hello! Compute@Edge!'))
app.get('/auth/*', (c) => c.text('You are authorized!'))
app.get('/hello/:name', (c) => {
  return c.text(`Hello ${c.req.param('name')}!!`)
})

app.fire()
