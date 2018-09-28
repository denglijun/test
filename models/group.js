'use strict';
module.exports = (sequelize,DataTypes) => {
    const Group = sequelize.define('group',{
        groupname : {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "group name"
        },
        NIDS : {
            type:DataTypes.STRING,
            allowNull: true,
            comment: "可访问的节点id，多个id用逗号隔开，如1,2,3",
        },
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '用户群组表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // Group.sync({force:true}).then(() => console.log('Group同步数据库模型成功...'));

    return Group;
};