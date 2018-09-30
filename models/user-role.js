'use strict';
module.exports = (sequelize,DataTypes) => {
    const UserRole = sequelize.define('user_role',{
        uid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id"
        },
        rid : {
            type:DataTypes.INTEGER,
            allowNull: false,
            comment: "角色id",
        },
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '用户角色关联表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // UserRole.sync({force:true}).then(() => console.log('UserRole同步数据库模型成功...'));

    return UserRole;
};