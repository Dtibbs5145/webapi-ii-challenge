const postRouter = require('./posts/post-router');

server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send('Express Middleware');
});