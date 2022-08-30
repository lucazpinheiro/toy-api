import Router from 'express'
import client from 'prom-client'
import PRODUCTS from './mock.js'

const routes = Router()

const register = new client.Registry()

const productsGET = new client.Counter({
  name: 'products_get',
  help: 'Number of GET requests'
})
const productsPOST = new client.Counter({
  name: 'products_post',
  help: 'Number of POST requests'
})

register.registerMetric(productsGET)
register.registerMetric(productsPOST)

register.setDefaultLabels({
  app: 'toy-api'
})

client.collectDefaultMetrics({ register })

routes.get('/status', (req, res) => {
  res.status(200).json({
    status: 'server is up!'
  })
})
routes.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType)
  register.metrics()
    .then(data => res.end(data))
})
routes.get('/products', (req, res) => {
  productsGET.inc(1)
  res.status(200).json({
    msg: 'TODO'
  })
})
routes.get('/products', (req, res) => {
  productsPOST.inc(1)
  res.status(200).json({
    msg: 'TODO'
  })
})

export default routes
