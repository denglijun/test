'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountUser = sequelize.define('CountUser',{
        blindnum : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "盲人数量",
        },
        friendnum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "亲友数量",
        },
        volunteernum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "志愿者数量",
        },
        customernum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "客服数量",
        }
    },
    {
        tableName: 'count_user',
        comment: 'APP端用户统计表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountUser;
};