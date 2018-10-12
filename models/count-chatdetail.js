'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountChatDetail = sequelize.define('CountChatDetail',{
        chat_id : {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "接通id",
        },
        caller_tel : {
            type:DataTypes.STRING(16),
            allowNull: false,
            comment: "呼叫者电话"
        },
        caller_name : {
            type:DataTypes.STRING(50),
            allowNull: false,
            comment: "呼叫者名字",
        },
        callee_tel : {
            type:DataTypes.STRING(16),
            allowNull: false,
            comment: "被呼叫者电话",
        },
        hangup_reason : {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "挂断原因",
        },
        call_time : {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "呼叫时间",
        },
        hangup_time : {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "挂断电话",
        },
        duration : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "沟通时长",
        },
        ua: {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "亲友端版本号",
        },
        ub: {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "盲人端版本号",
        },
        callAt : {
            type:DataTypes.STRING,
            allowNull: false,
            comment: "呼叫日期",
        }
    },
    {
        tableName: 'count_chatdetail',
        comment: 'APP端接通明细表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountChatDetail;
};