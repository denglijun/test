'use strict';
module.exports = (sequelize,DataTypes) => {
    const CountAnswerFailReason = sequelize.define('CountAnswerFailReason',{
        failnum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "失败次数",
        },
        reason : {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "失败原因",
        },
    },
    {
        tableName: 'count_answerfailreason',
        comment: 'APP端接听失败原因统计',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return CountAnswerFailReason;
};