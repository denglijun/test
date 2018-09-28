'use strict';
module.exports = (sequelize,DataTypes) => {
    const Node = sequelize.define('node',{
        nodename : {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "节点名称"
        },
        pid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "父节点id，无父节点默认为0",
        },
        key : {
            type: DataTypes.STRING(16),
            allowNull: false,
            comment: "节点标志符"
        },
        link: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: null,
            comment: '链接地址，无链接为javascript:void(0)'
        }
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '节点资源表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    // Node.sync({alter:true}).then(() => console.log('Node同步数据库模型成功...'));

    return Node;
};