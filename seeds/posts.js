const { Post } = require('../models');

const postData = [
    {
        title: 'Post 1',
        body_content: 'This is post 1',
        user_id: 1,
    },
    {
        title: 'Post 2',
        body_content: 'This is post 2',
        user_id: 1,
    },
    {
        title: 'Post 3',
        body_content: 'This is post 3',
        user_id: 2,
    },
    {
        title: 'Post 4',
        body_content: 'This is post 4',
        user_id: 3,
    },
    {
        title: 'Post 5',
        body_content: 'This is post 5',
        user_id: 4,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;