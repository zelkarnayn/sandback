const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../server');

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firs_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {sequelize, modelName: 'User'})

class Article extends Model {}
Article.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {sequelize, modelName: 'Article'});

class Comment extends Model {}
Comment.init({
    article: {
        type: DataTypes.INTEGER,
        references: {
            model: Article,
            key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    dislikes: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {sequelize, modelName: 'Comment'});

User.hasMany(Article)
Article.belongsTo(User)
Article.hasMany(Comment)
Comment.belongsTo(Article)
Comment.belongsTo(User)


module.exports = {
    User,
    Article,
    Comment
}

