const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.userId,
        }
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => 
            post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Edit Post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.userId,
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.render('editPost', {
            post: dbPostData,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//New Post
router.get('/new', withAuth, (req, res) => {
    res.render('addPost');
});


module.exports = router;