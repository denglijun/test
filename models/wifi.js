'use strict';
module.exports = (sequelize, DataTypes) => {
    const Wifi = sequelize.define('wifi', {
        serialno: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "序列号"
        },
        wifiname: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "wifi名称"
        },
        wifipwd: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: "wifi密码",
        },
        tel: {
            type: DataTypes.STRING(11),
            allowNull: false,
            comment: "用户手机号",
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '是否可用, 1可用,0未可用'
        },
    }, {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: 'wifi管理表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // User.sync({force:true}).then(() => console.log('User同步数据库模型成功...'));

    return Wifi;
};