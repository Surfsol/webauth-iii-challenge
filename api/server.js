const express = require('express')

const server = express()

//bring in routers
const apiRouter = require('./api-router');


//bring in middleware, then configure it to server
const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use('/api', apiRouter);


server.use('/', (req, res) => {
    {res.status(200).json('Its Alive')}
})

module.exports = server