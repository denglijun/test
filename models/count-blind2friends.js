'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountBlind2Friend = sequelize.define('CountBlind2Friend',{
        zero: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定0个亲友的盲人数",
        },
        one : {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "绑定一个亲友的盲人数",
        },
        two : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定两个亲友的盲人数",
        },
        three : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定三个亲友的盲人数",
        },
        four : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定四个亲友的盲人数",
        },
        five : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定五个亲友的盲人数",
        },
        sixtoten : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定6-10个亲友的盲人数",
        },
        overten : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "绑定10个以上亲友的盲人数",
        }
    },
    {
        tableName: 'count_blind2friends',
        comment: 'APP端盲人绑定亲友的数量分布图',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountBlind2Friend;
};