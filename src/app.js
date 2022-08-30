import express from 'express'
import routes from './routes.js'

const PORT = 3000

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`)
  next()
})

app.use('/', routes)

export default function startApp() {
  app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
}

