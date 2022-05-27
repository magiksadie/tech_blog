const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//Handle Login Post Request
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this username' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({
                user: dbUserData,
                message: 'You are now logged in!'
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(dbUserData => {
        req.session.userId = dbUserData.id;
        req.session.loggedIn = true;
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;