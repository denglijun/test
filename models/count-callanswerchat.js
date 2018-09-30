'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountCallanswerchat = sequelize.define('CountCallanswerchat',{
        callnum : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "呼叫次数",
        },
        answernum: {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "接听次数",
        },
        chatnum: {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "接通次数",
        },
        answerSuccessRate: {
            type:DataTypes.STRING(8),
            allowNull: false,
            comment: "接听成功率",
        },
        chatSuccessRate: {
            type:DataTypes.STRING(8),
            allowNull: false,
            comment: "接通成功率",
        },
        callfriendnum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "呼叫亲友的次数",
        },
        callvolunteernum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "呼叫志愿者的次数",
        },
        callcustomernum : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "呼叫客服的次数",
        }
    },
    {
        tableName: 'count_callanswerchat',
        comment: 'APP端用户呼叫接听接通统计表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    return CountCallanswerchat;
};