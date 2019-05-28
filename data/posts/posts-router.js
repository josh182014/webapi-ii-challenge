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
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                errorMessage: 'Please provide title and contents for the post',
            })
        }
        else {
            const post = await Posts.insert(req.body);
            res.status(201).json(post);
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
        error: 'There was an error while saving the post to the database',
        });
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        if (req.body.text) {
            const count = await Posts.findById(req.body.post_id)
            if (count[0]) {
                const comment = await Posts.insertComment(req.body);
                res.status(201).json(comment);
            }
            else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'})
            }
        }
        else {
            res.status(400).json({errorMessage: 'Please provide text for the comment'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
        error: 'There was an error while sving the comment to the database.',
        });
    }
    });
    


module.exports = router;