import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getStockData } from './stockAPI.js'

const app = new Hono()

// Allow your React FE origin
app.use(
  '/api/*',
  cors({
    origin:'http://localhost:5173',
    allowMethods: ['GET'],
  })
)

app.get('/api/stocks/:symbol', async (c) => {
  const symbol = c.req.param('symbol')?.toUpperCase()
  if (!symbol) {
    return c.json({ error: 'Symbol is required' }, 400)
  }

  try {
    const data = await getStockData({ symbol })
    
    // Cache at the CDN/browser level for 15 mins to match Yahoo's interval
    c.header('Cache-Control', 'public, max-age=900')
    return c.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch stock data'
    return c.json({ error: message }, 502)
  }
})

const port = 3030
console.log(`Server running on http://localhost:${port}`)
serve({ fetch: app.fetch, port })