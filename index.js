require('dotenv').config()
const express = require('express')
const port = process.env.PORT 
const userRouter = require('./users/userRouter')
const dbStart = require('./configs/dbs')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(compression())

app.use('/', userRouter)

dbStart()
 .then(() => {
  app.listen(port,()=> {
   console.log(`listen port ${port}`)
  })
 })
 .catch(e => console.log(e))