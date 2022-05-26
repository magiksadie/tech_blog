const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static async getAllPosts() {
        return await this.findAll();
    }

    static async getPostById(id) {
        return await this.findByPk(id);
    }

    static async addPost(newPostData) {
        return await this.create(newPostData);
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            },
        },
        body_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'post',
        }
);

module.exports = Post;