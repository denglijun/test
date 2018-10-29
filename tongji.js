const db = require('./appdb')();
const sqls = require('./tongjisql');
const sysdb = require('./sysdb');
const moment = require('moment');
const time = moment().format('YYYY-MM-DD HH:mm:ss');
const yestime = moment(Date.now() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'); // 统计时的昨天日期
db.init();
const con = db.connect();
var blindnum = new Promise(function(resolve, reject) {
    con.query(sqls.blindnum, [], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var friendsnum = new Promise(function(resolve, reject) {
    con.query(sqls.friendsnum, [], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var volunteersnum = new Promise(function(resolve, reject) {
    con.query(sqls.volunteersnum, [], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var customersnum = new Promise(function(resolve, reject) {
    con.query(sqls.customersnum, [], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var daycallangel = new Promise(function(resolve, reject) {
    con.query(sqls.daycallangel, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var daycallvo = new Promise(function(resolve, reject) {
    con.query(sqls.daycallvo, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var daycallcus = new Promise(function(resolve, reject) {
    con.query(sqls.daycallcus, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var daycallnum = new Promise(function(resolve, reject) {
    con.query(sqls.daycallnum, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});

var dayanswernum = new Promise(function(resolve, reject) {
    con.query(sqls.dayanswernum, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});

var daychatnum = new Promise(function(resolve, reject) {
    con.query(sqls.daychatnum, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var friendaudio = new Promise(function(resolve, reject) {
    con.query(sqls.friendaudio, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var blindaudio = new Promise(function(resolve, reject) {
    con.query(sqls.blindaudio, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
var blindvideo = new Promise(function(resolve, reject) {
    con.query(sqls.blindvideo, [yestime], function(err, result) {
        if (!err) {
            resolve(result);
        }
    });
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([blindnum, friendsnum, volunteersnum, customersnum, daycallangel, daycallvo, daycallcus, daycallnum, dayanswernum, daychatnum, friendaudio, blindaudio, blindvideo]).then(function(results) {
    console.log(results);
    if (results[0].length > 0) {
        var b = results[0][0].blindnum;
    } else {
        var b = 0;
    }
    if (results[1].length > 0) {
        var f = results[1][0].friendsnum;
    } else {
        var f = 0;
    }
    if (results[2].length > 0) {
        var v = results[2][0].volunteersnum;
    } else {
        var v = 0;
    }
    if (results[3].length > 0) {
        var c = results[3][0].customersnum;
    } else {
        var c = 0;
    }
    if (results[4].length > 0) {
        var callangel = results[4][0].daycallangel;
    } else {
        var callangel = 0;
    }
    if (results[5].length > 0) {
        var callvo = results[5][0].daycallvo;
    } else {
        var callvo = 0;
    }
    if (results[6].length > 0) {
        var callcus = results[6][0].daycallcus;
    } else {
        var callcus = 0;
    }
    if (results[7].length > 0) {
        var callnum = results[7][0].daycallnum;
    } else {
        var callnum = 0;
    }
    if (results[8].length > 0) {
        var answernum = results[8][0].dayanswernum;
    } else {
        var answernum = 0;
    }
    if (results[9].length > 0) {
        var chatnum = results[9][0].daychatnum;
    } else {
        var chatnum = 0;
    }
    if (parseFloat(callnum) > 0) {
        var answerRate = Math.round(parseFloat(answernum) / parseFloat(callnum) * 10000) / 100.00 + "%";
    } else {
        var answerRate = 0;
    }
    if (parseFloat(answernum) > 0) {
        var chatRate = Math.round(parseFloat(chatnum) / parseFloat(answernum) * 10000) / 100.00 + "%";
    } else {
        var chatRate = 0;
    }
    if (results[10].length > 0) {
        var faudio = results[10][0].friendaudio;
    } else {
        var faudio = 0;
    }
    if (results[11].length > 0) {
        var baudio = results[11][0].blindaudio;
    } else {
        var baudio = 0;
    }
    if (results[12].length > 0) {
        var bvideo = results[12][0].blindvideo;
    } else {
        var bvideo = 0;
    }
    sysdb.query('insert into count_user (blindnum,friendnum,volunteernum,customernum,createdAt,updatedAt) values (?,?,?,?,?,?)', [b, f, v, c, time, time], function(err, re) {
        console.log(err);
        console.log(re);
    });
    sysdb.query('insert into count_callanswerchat (callnum,answernum,chatnum,answerSuccessRate,chatSuccessRate,callfriendnum,callvolunteernum,callcustomernum,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?)', [callnum, answernum, chatnum, answerRate, chatRate, callangel, callvo, callcus, time, time], function(err, re) {
        console.log(err);
        console.log(re);
    });
    sysdb.query('insert into count_chatfailreason (failnum,friendaudio,friendvideo,blindaudio,blindvideo,createdAt,updatedAt) values (?,?,?,?,?,?,?)', [0, faudio, 0, baudio, bvideo, time, time], function(err, re) {
        console.log(err);
        console.log(re);
    });

});

con.query(sqls.bTf, [], function(err, result) {
    if (err) throw err;
    console.log(result);
    var onet = 0,
        twot = 0,
        threet = 0,
        fourt = 0,
        fivet = 0,
        sixtotent = 0,
        overtent = 0;
    var total = 0;
    for (let index in result) {
        result[index].blind2AngelNum = parseInt(result[index].blind2AngelNum);
        total += parseInt(result[index].blind2AngelFenbu);
        if (result[index].blind2AngelNum == 1) {
            onet = result[index].blind2AngelFenbu;
        }
        if (result[index].blind2AngelNum == 2) {
            twot = result[index].blind2AngelFenbu;
        }
        if (result[index].blind2AngelNum == 3) {
            threet = result[index].blind2AngelFenbu
        }
        if (result[index].blind2AngelNum == 4) {
            fourt = result[index].blind2AngelFenbu
        }
        if (result[index].blind2AngelNum == 5) {
            fivet = result[index].blind2AngelFenbu
        }
        if (result[index].blind2AngelNum > 5 && result[index].blind2AngelNum <= 10) {
            sixtotent = result[index].blind2AngelFenbu
        }
        if (result[index].blind2AngelNum > 10) {
            overtent = result[index].blind2AngelFenbu
        }
    }
    con.query(sqls.friendsnum, [], function(err, result) {
        var zerot = parseInt(result[0].friendsnum) - total;
        sysdb.query('insert into count_blind2friends (zero,one,two,three,four,five,sixtoten,overten,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?)', [zerot, onet, twot, threet, fourt, fivet, sixtotent, overtent, time, time], function(err, re) {
            console.log(err);
            console.log(re);
        })
    });
});

con.query(sqls.fTb, [], function(err, result) {
    if (err) throw err;
    var onett = 0,
        twott = 0,
        threett = 0,
        fourtt = 0,
        fivett = 0,
        sixtotentt = 0,
        overtentt = 0;
    var total = 0;
    for (let i in result) {
        result[i].angel2Blindnum = parseInt(result[i].angel2Blindnum);
        total += parseInt(result[i].angel2Blindfenbu);
        if (result[i].angel2Blindnum == 1) {
            onett = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum == 2) {
            twott = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum == 3) {
            threett = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum == 4) {
            fourtt = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum == 5) {
            fivett = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum > 5 && result[i].angel2Blindnum <= 10) {
            sixtotentt = result[i].angel2Blindfenbu
        }
        if (result[i].angel2Blindnum > 10) {
            overtentt = result[i].angel2Blindfenbu
        }
    }
    con.query(sqls.blindnum, [], function(err, result) {
        var zerott = parseInt(result[0].blindnum) - total;
        sysdb.query('insert into count_friend2blind (zero,one,two,three,four,five,sixtoten,overten,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?)', [zerott, onett, twott, threett, fourtt, fivett, sixtotentt, overtentt, time, time], function(err, re) {
            console.log(err);
            console.log(re);
        })
    });

});

con.query(sqls.answerfail, [yestime], function(err, result) {
    if (err) throw err;
    for (var k in result) {
        sysdb.query('insert into count_answerfailreason (failnum,reason,user_agent,createdAt,updatedAt) values (?,?,?,?,?)', [result[k].toalcall, result[k].reason, result[k].user_agent, time, time], function(err, re) {
            console.log(err);
            console.log(re);
        })
    }
});

con.query(sqls.calldetail, [yestime], function(err, result) {
    if (err) throw err;
    for (var r in result) {
        sysdb.query('insert into count_calldetail (chat_id,caller_tel,caller_name,callee_tel,hangup_reason,call_time,hangup_time,callAt,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?)', [result[r].chat_id, result[r].caller_tel, result[r].caller_name, result[r].callee_tel, result[r].hangup_reason, result[r].call_time, result[r].hangup_time, result[r].callAt, time, time], function(err, result) {
            console.log(err);
            console.log(result);
        });
    }
});

con.query(sqls.chatdetail, [yestime], function(err, result) {
    if (err) throw err;
    for (var t in result) {
        sysdb.query('insert into count_chatdetail (chat_id,caller_tel,caller_name,callee_tel,hangup_reason,call_time,hangup_time,duration,ua,ub,callAt,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [result[t].chat_id, result[t].caller_tel, result[t].caller_name, result[t].callee_tel, result[t].hangup_reason, result[t].call_time, result[t].hangup_time, result[t].duration, result[t].ua, result[t].ub, result[t].callAt, time, time], function(err, result) {
            console.log(err);
            console.log(result);
        });
    }
});

con.query(sqls.countSignal, [yestime], function(err, result) {
    if (err) throw err;
    for (var t in result) {
        sysdb.query('insert into count_signal (chat_id,call_type,caller_uid,caller_tel,callee_uid,callee_tel,hanguper_uid,hanguper_tel,call_time,arrived_time,answer_time,hangup_time,notified_count,notified_family,notified_cs,notified_vt,notified_msg,notified_push,arrived_count,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [result[t].chat_id, result[t].call_type, result[t].caller_uid, result[t].caller_tel, result[t].callee_uid, result[t].callee_tel, result[t].hanguper_uid, result[t].hanguper_tel, result[t].call_time, result[t].arrived_time, result[t].answer_time, result[t].hangup_time, result[t].notified_count, result[t].notified_family, result[t].notified_cs, result[t].notified_vt, result[t].notified_msg, result[t].notified_push, result[t].arrived_count, time, time], function(err, result) {
            console.log(err);
            console.log(result);
        });
    }
});