'use strict';
module.exports = (sequelize,DataTypes) => {
    const UserGroup = sequelize.define('user_group',{
        uid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id"
        },
        gid : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "群组id",
        },
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '用户群组关联表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // UserGroup.sync({force:true}).then(() => console.log('UserGroup同步数据库模型成功...'));

    return UserGroup;
};