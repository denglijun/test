'use strict';
module.exports = (sequelize,DataTypes) => {
    const AppBlindFriend = sequelize.define('AppBlindFriend',{
        blindId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "盲人ID",
        },
        blindname : {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "盲人名称",
        },
        blindtel : {
            type:DataTypes.STRING(16),
            allowNull: true,
            comment: "盲人手机",
        },
        bindFriendNum : {
            type:DataTypes.INTEGER,
            defaultValue: 0,
            comment: "绑定亲友的数量",
        },
    },
    {
        tableName: 'count_blind2friends',
        comment: 'APP端盲人绑定亲友的数量统计表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return AppBlindFriend;
};