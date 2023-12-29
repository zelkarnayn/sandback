const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../server');
const {compare} = require("bcrypt");

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
        values: ['REACT', 'JS', 'ANGULAR', 'VUE', 'TS'],
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
    },
    like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Article,
            key: "id"
        }
    }
}, {sequelize, modelName: 'LikesArticle'})


class LikesComment extends Model {}
LikesComment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comment,
            key: "id"
        }
    }
}, {sequelize, modelName: 'LikesComment'})

class FavoriteArticle extends Model {}
FavoriteArticle.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Article,
            key: "id"
        }
    }
}, {sequelize, modelName: 'FavoriteArticle'})


User.hasMany(Article)
Article.belongsTo(User)

User.hasMany(FavoriteArticle)
FavoriteArticle.belongsTo(User)

FavoriteArticle.hasMany(Article)
Article.belongsTo(FavoriteArticle)

Article.belongsTo(User)
Article.hasMany(Comment)

Comment.belongsTo(Article)
Comment.belongsTo(User)

Comment.hasMany(LikesComment)
User.hasMany(LikesComment)
LikesComment.belongsTo(Comment)
LikesComment.belongsTo(User)

Article.hasMany(LikesArticle)
User.hasMany(LikesArticle)
LikesArticle.belongsTo(User)
LikesArticle.belongsTo(Article)

module.exports = {
    User,
    Article,
    Comment,
    Token,
    LikesComment,
    LikesArticle,
    FavoriteArticle
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