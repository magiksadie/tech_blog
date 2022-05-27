const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body_content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No posts found' });
                return;
            }
            res.json(dbPostData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body_content: req.body.body_content,
        user_id: req.session.userId,
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body_content: req.body.body_content,
        },
        {
            where: {
                id: req.params.id,
            },
        },
    )
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            //console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;