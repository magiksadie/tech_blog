const router = require('express').Router();
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body_content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include:
                    {
                        model: User,
                        attributes: ['username'],
                    },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => 
            post.get({ plain: true }));

            res.render('home', {
                posts,
                loggedIn: req.session.loggedIn,
                });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

module.exports = router;