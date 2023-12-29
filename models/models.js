const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../server');

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin', 'moderator'],
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
    },
    activationLink: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {sequelize, modelName: 'User'})

class Token extends Model {}
Token.init({
    user: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'Token'});

class Article extends Model {}
Article.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'
        }
    },
    category: {
        type: DataTypes.ENUM,
        values: ['REACT', 'JS', 'ANGULAR', 'VUE'],
        defaultValue: 'JS',
        allowNull: false
    }
}, {sequelize, modelName: 'Article'});

class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
    }
}, {sequelize, modelName: 'Comment'});

class LikesArticle extends Model {}
LikesArticle.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {sequelize, modelName: 'LikesArticle'})

class DislikesArticle extends Model {}
DislikesArticle.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {sequelize, modelName: 'DislikesArticle'})

class LikesComment extends Model {}
LikesComment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {sequelize, modelName: 'LikesComment'})

class DislikesComment extends Model {}
DislikesComment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {sequelize, modelName: 'DislikesComment'})

User.hasMany(Article)

Article.belongsTo(User)
Article.hasMany(Comment)

Comment.belongsTo(Article)
Comment.belongsTo(User)





module.exports = {
    User,
    Article,
    Comment,
    Token
}

// COMMENT {
//     text,
//     article,
//     author,
// }

// USER {
//     firs_name,
//     last_name,
//     email,
//     password
// }

// ARTICLE {
//     title,
//     text,
//     author,
// }