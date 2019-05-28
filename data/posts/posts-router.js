const router = require('express').Router();

const Posts = require('../db');

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: 'Error retrieving the posts',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
        message: 'Error adding the post',
        });
    }
});
    


module.exports = router;