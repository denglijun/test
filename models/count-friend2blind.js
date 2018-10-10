'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountFriend2blind = sequelize.define('CountFriend2blind',{
        friendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "亲友ID",
        },
        friendname : {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "亲友名称",
        },
        friendtel : {
            type:DataTypes.STRING(16),
            allowNull: true,
            comment: "亲友手机",
        },
        friendBlindNum : {
            type:DataTypes.INTEGER,
            defaultValue: 0,
            comment: "绑定盲人的数量",
        },
    },
    {
        tableName: 'count_friend2blind',
        comment: 'APP端亲友绑定盲人的数量统计表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountFriend2blind;
};