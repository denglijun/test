'use strict';
module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define('node', {
        nodename: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "节点名称"
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "父节点id，无父节点默认为0",
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '节点顺序'
        },
        isshow: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 1,
            comment: '节点是否显示,1显示，0不显示',
        },
        link: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: null,
            comment: '链接地址，无链接为javascript:void(0)'
        },
        type: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 1,
            comment: '节点类型,1菜单，2按钮，3功能',
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '图标',
        },
        mark: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '备注',
        }
    }, {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '节点资源表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    // Node.sync({alter:true}).then(() => console.log('Node同步数据库模型成功...'));

    return Node;
};