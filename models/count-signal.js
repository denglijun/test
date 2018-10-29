'use strict';
module.exports = (sequelize, DataTypes) => {
    const CountSignal = sequelize.define('CountSignal', {
        //呼叫标识
        chat_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        //呼叫类型:0:全部, 1:亲友,2: 志愿者, 3:客服
        call_type: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //呼叫者id
        caller_uid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //呼叫者帐号
        caller_tel: {
            type: DataTypes.STRING(32),
            defaultValue: "",
        },
        //接听者id
        callee_uid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //接听者帐号
        callee_tel: {
            type: DataTypes.STRING(32),
            defaultValue: "",
        },
        //挂断者id
        hanguper_uid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //挂断者帐号
        hanguper_tel: {
            type: DataTypes.STRING(32),
            defaultValue: "",
        },
        //呼叫时间
        call_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        //首个callroom-arrived响应时间
        arrived_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        //接听时间
        answer_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        //挂断时间
        hangup_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        //通知了多少用户
        notified_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //通知了多少亲友
        notified_family: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //通知了多少客服
        notified_cs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //通知了多少志愿者
        notified_vt: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //消息通知次数
        notified_msg: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //推送通知次数
        notified_push: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        //callroom-arrived次数
        arrived_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        indexes: [{
                name: 'caller_uid',
                method: 'BTREE',
                fields: ['caller_uid']
            },
            {
                name: 'callee_uid',
                method: 'BTREE',
                fields: ['callee_uid']
            },
            {
                name: 'createdAt',
                method: 'BTREE',
                fields: ['createdAt']
            }
        ],
        tableName: 'count_signal',
    });

    return CountSignal;
};