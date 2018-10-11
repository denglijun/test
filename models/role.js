'use strict';
module.exports = (sequelize,DataTypes) => {
    const Role = sequelize.define('role',{
        rolename : {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "角色节点"
        },
        englishname : {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "英文名称"
        },
        is_active : {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "是否激活，1激活,0未激活"
        },
        pid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: '父节点id'
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "排序"
        },
        NIDS : {
            type:DataTypes.INTEGER,
            allowNull: true,
            comment: "节点id逗号隔开",
        },
    },
    {
        freezeTableName: true, //指示创建的数据表与model同名，而不是默认的model+'s'
        comment: '角色表',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    // Role.sync({alter:true}).then(() => console.log('Role同步数据库模型成功...'));

    return Role;
};