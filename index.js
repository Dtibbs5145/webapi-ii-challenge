const express = require('express');

const server = express();

const port = 5000;

const postRouter = require('./posts/post-router');

server.use(express.json());

server.use('/api/posts', postRouter);
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Express Middleware');
});

server.listen(port, () => console.log(`***\n API running on port ${port} ***\n`));