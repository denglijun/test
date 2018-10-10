const db = require('./appdb')();
const sqls = require('./tongjisql');
const sysdb = require('./sysdb');
const moment = require('moment');
const time = moment().format('YYYY-MM-DD hh:mm:ss');
db.init();
const con = db.connect();
var blindnum = new Promise(function (resolve, reject) {
    con.query(sqls.blindnum,[],function(err,result) {
       if ( !err ) {
           resolve(result);
       }
    });
});
var friendsnum = new Promise(function (resolve, reject) {
    con.query(sqls.friendsnum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var volunteersnum = new Promise(function (resolve, reject) {
    con.query(sqls.volunteersnum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var customersnum = new Promise(function (resolve,reject) {
    con.query(sqls.customersnum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var daycallangel = new Promise(function (resolve,reject) {
    con.query(sqls.daycallangel,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var daycallvo = new Promise(function (resolve,reject) {
    con.query(sqls.daycallvo,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var daycallcus = new Promise(function (resolve,reject) {
    con.query(sqls.daycallcus,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var daycallnum = new Promise(function (resolve,reject) {
    con.query(sqls.daycallnum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});

var dayanswernum =  new Promise(function (resolve,reject) {
    con.query(sqls.dayanswernum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});

var daychatnum =  new Promise(function (resolve,reject) {
    con.query(sqls.daychatnum,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var friendaudio = new Promise(function (resolve,reject) {
    con.query(sqls.friendaudio,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var blindaudio = new Promise(function (resolve,reject) {
    con.query(sqls.blindaudio,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
var blindvideo = new Promise(function (resolve,reject) {
    con.query(sqls.blindvideo,[],function(err,result) {
        if ( !err ) {
            resolve(result);
        }
     });
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([blindnum,friendsnum,volunteersnum,customersnum,daycallangel,daycallvo,daycallcus,daycallnum,dayanswernum,daychatnum,friendaudio,blindaudio,blindvideo]).then(function (results) {
    console.log(results);
    var b = results[0][0].blindnum;
    var f = results[1][0].friendsnum;
    var v = results[2][0].volunteersnum;
    var c = results[3][0].customersnum;
    if ( results[4][0] > 0 ) {
        var callangel = results[4][0].daycallangel;
    } else {
        var callangel = 0;
    }
    if ( results[5].length > 0 ) {
        var callvo = results[5][0].daycallvo;
    } else {
        var callvo =0;
    }
    if ( results[6].length > 0 ) {
        var callcus = results[6][0].daycallcus;
    } else {
        var callcus = 0;
    }
    var callnum =  results[7][0].daycallnum;
    var answernum =  results[8][0].dayanswernum;
    var chatnum =  results[9][0].daychatnum;
    var answerRate = Math.round(parseFloat(answernum) / parseFloat(callnum) * 10000) / 100.00 + "%";
    var chatRate =Math.round(parseFloat(chatnum) / parseFloat(answernum) * 10000) / 100.00 + "%";
    if ( results[10].length > 0 ) {
        var faudio = results[10][0].friendaudio;
    } else {
        var faudio = 0;
    }
    if ( results[11].length > 0 ) {
        var baudio = results[11][0].blindaudio;
    } else {
        var baudio = 0;
    }
    if ( results[12].length > 0 ) {
        var bvideo = results[12][0].blindvideo;
    } else {
        var bvideo = 0;
    }
    sysdb.query('insert into count_user (blindnum,friendnum,volunteernum,customernum,createdAt,updatedAt) values (?,?,?,?,?,?)',[b,f,v,c,time,time],function(err,re) {
        console.log(err);
        console.log(re);
    });
    sysdb.query('insert into count_callanswerchat (callnum,answernum,chatnum,answerSuccessRate,chatSuccessRate,callfriendnum,callvolunteernum,callcustomernum,createdAt,updatedAt) values (?,?,?,?,?,?,?,?,?,?)',[callnum,answernum,chatnum,answerRate,chatRate,callangel,callvo,callcus,time,time],function(err,re) {
        console.log(err);
        console.log(re);
    });
    sysdb.query('insert into count_chatfailreason (failnum,friendaudio,friendvideo,blindaudio,blindvideo,createdAt,updatedAt) values (?,?,?,?,?,?,?)',[0,faudio,0,baudio,bvideo,time,time],function(err,re) {
        console.log(err);
        console.log(re);
    });
   
});

con.query(sqls.bTf,[],function(err,result) {
    if ( err ) throw err;
    for ( var index in result ) {
        sysdb.query('insert into count_blind2friends (blindId,blindname,blindtel,bindFriendNum,createdAt,updatedAt) values (?,?,?,?,?,?)',[result[index].blindId,null,null,result[index].angelnum,time,time],function(err,re) {
            console.log(err);
            console.log(re);
        }) 
    }
});

con.query(sqls.fTb,[],function(err,result) {
    if ( err ) throw err;
    for ( var i in result ) {
        sysdb.query('insert into count_friend2blind (friendId,friendname,friendtel,friendBlindNum,createdAt,updatedAt) values (?,?,?,?,?,?)',[result[i].angelId,null,null,result[i].blindnum,time,time],function(err,re) {
            console.log(err);
            console.log(re);
        }) 
    }
});

con.query(sqls.answerfail,[],function(err,result) {
    if (err) throw err;
    for( var k in result ) {
        sysdb.query('insert into count_answerfailreason (failnum,reason,createdAt,updatedAt) values (?,?,?,?)',[result[k].toalcall,result[k].reason,time,time],function(err,re) {
            console.log(err);
            console.log(re);
        }) 
    }
})