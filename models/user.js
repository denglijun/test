'use strict';
module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',{
        username : {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "用户名称"
        },
        pwd : {
            type:DataTypes.STRING(32),
            allowNull: false,
            comment: "密码",
        },
        tel : {
            type:DataTypes.STRING(11),
            allowNull: false,
            comment: "手机号",
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
            comment: "邮箱"
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '是否激活, 1激活,0未激活'
        }
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '用户表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // User.sync({force:true}).then(() => console.log('User同步数据库模型成功...'));

    return User;
};