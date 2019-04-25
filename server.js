const express = require('express');

const postRouter = require('./posts-router')

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive!")
})



server.use('/api/posts', postRouter);


module.exports = server
