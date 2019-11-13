const express = require('express')

const server = express()

//bring in routers
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

//bring in middleware, then configure it to server
const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.use('/', (req, res) => {
    {res.status(200).json('Its Alive')}
})

module.exports = server