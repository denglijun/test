'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountFriend2blind = sequelize.define('CountFriend2blind',{
        zero : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定0个盲人的亲友数",
        },
        one : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定一个盲人的亲友数",
        },
        two : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定两个盲人的亲友数",
        },
        three : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定三个盲人的亲友数",
        },
        four : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定四个盲人的亲友数",
        },
        five : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定五个盲人的亲友数",
        },
        sixtoten : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定6-10个盲人的亲友数",
        },
        overten : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定10个以上盲人的亲友数",
        }
    },
    {
        tableName: 'count_friend2blind',
        comment: 'APP端亲友绑定盲人的分布图',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountFriend2blind;
};