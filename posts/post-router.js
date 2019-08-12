const router = require('express').Router();
const db = require('../data/db');

router.get('/', async (req, res) => {
    console.log('Hello world');
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const posts = await db.findById(req.params.id);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: 'Post could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const posts = await db.findPostComments(req.params.id);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: 'Could not find this posts comments' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const posts = await db.insert(req.body);
        if (posts) {
            res.status(201).json(posts);
        } else {
            res.status(404).json({ message: 'Add stuff to the post and make it nice!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/comments/:id', async (req, res) => {
    console.log('Hello world!');
    try {
        const posts = await db.insertComment(req.body);
        if (!req.body.text) {
            res.status(400).json({ message: 'Please provide text for the comment' });
        } if (posts) {
            res.status(201).json(posts);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const posts = await db.update(req.params.id, req.body);
        if (!req.params.id) {
            res.status(400).json({ message: 'Please provide contents for the post' });
        } if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'The post information could not be modified' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await db.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'Post was successfully deleted.' });
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'The post could not be removed' });
    }
});

module.exports = router;