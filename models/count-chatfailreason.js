'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountChatFailReason = sequelize.define('CountChatFailReason',{
        failnum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "失败次数",
        },
        friendaudio : {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "亲友端音频失败次数",
        },
        friendvideo : {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "亲友端视频失败次数",
        },
        blindaudio : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "盲人端音频失败次数",
        },
        blindvideo : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "盲人端视频失败次数",
        },
    },
    {
        tableName: 'count_chatfailreason',
        comment: 'APP端接通失败原因统计',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    return CountChatFailReason;
};