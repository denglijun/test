module.exports = {
    "blindnum" : "select count(id) as blindnum  from users where role=1", //盲人数量
    "friendsnum" : "select count(id) as friendsnum  from users where role=2", //亲友数
    "volunteersnum" : "select count(id) as volunteersnum  from users where role=4 or (role=2 and service = 2)", //志愿者数
    "customersnum" : "select count(id) as customersnum  from users where role=8", //客服者数
  //  "bTf" : "select blindId,count(angelId) as angelnum from `blind2family-through` group by (blindId)", //每个盲人绑定的亲友数
    "bTf" : "select count(*) as blind2AngelFenbu,temp.blind2AngelNum from (select count(*) as blind2AngelNum from `blind2family-through` group by (blindId) ) as temp group by temp.blind2AngelNum", //每个盲人绑定的亲友数分布
    "fTb" : "select count(*) as angel2Blindfenbu,temp.angel2Blindnum from (select count(*) as angel2Blindnum from `blind2family-through` group by (angelId) ) as temp group by temp.angel2Blindnum", //每个亲友绑定的盲人数分布图
    "daycallnum" : "select count(*) as daycallnum,curdate() as cur from `call_orders` where date((date_add(createdAt, interval 8 hour))) = ?", //呼叫次数
    "daycallangel" : "select count(*) as daycallangel,date(date_add(createdAt, interval 8 hour)) cur from `call_orders` where service_type=1 and date(date_add(createdAt, interval 8 hour))=? group by cur", //呼叫亲友
    "daycallvo" : "select count(*) as daycallvo,date(date_add(createdAt, interval 8 hour)) cur from `call_orders` where service_type=2 and date(date_add(createdAt, interval 8 hour))=? group by cur",//呼叫志愿者
    "daycallcus" : "select count(*) as daycallcus,date(date_add(createdAt, interval 8 hour)) cur from `call_orders` where service_type=3 and date(date_add(createdAt, interval 8 hour))=? group by cur", //呼叫客服
    "dayanswernum" : "select count(*) as dayanswernum,curdate() as cur from `answered_calls` where date((date_add(createdAt, interval 8 hour))) = ?",//接听次数
    "daychatnum" : "select count(*) as daychatnum,curdate() as cur from `chat_orders` where date((date_add(createdAt, interval 8 hour))) = ?", //接通次数
    "answerSuccessRate" : "select callnums,callsuccessnum,CONCAT(ROUND(temp.callsuccessnum / c.callnums * 100,2),'','%') as successrate,calldate from (select count(*) as callnums,date(date_add(createdAt, interval 8 hour)) calldate from call_orders group by calldate) as c,(select count(*) as callsuccessnum,date(date_add(answered_calls.createdAt, interval 8 hour)) answerdate from call_orders,answered_calls where call_orders.chat_id=answered_calls.chat_id group by answerdate) as temp where c.calldate = temp.answerdate and calldate = ?",//接听成功率
    "chatSuccessRate" : "select answernums,chatnums,CONCAT(ROUND(c.chatnums / a.answernums * 100,2),'','%') as successrate,chatdate from (select count(*) as answernums,date(date_add(createdAt, interval 8 hour)) answerdate from answered_calls group by answerdate) as a,(select count(*) as chatnums,date(date_add(chat_orders.createdAt, interval 8 hour)) chatdate from chat_orders,answered_calls where chat_orders.chat_id=answered_calls.chat_id group by chatdate) as c where a.answerdate = c.chatdate and chatdate=?", //接通成功率
    "answerfail" : "select count(*) as toalcall,hangup_reason as reason,date((date_add(createdAt, interval 8 hour))) as calldate from call_orders where date((date_add(createdAt, interval 8 hour))) = ? group by hangup_reason,calldate", //接听失败原因统计
    "friendaudio" : "select count(*) as friendaudio,date((date_add(createdAt, interval 8 hour))) as chatdate from chat_orders where first_audioa=0 and date((date_add(createdAt, interval 8 hour)))=? group by chatdate", //亲友端音频出问题
    "blindaudio" : "select count(*) as blindaudio,date((date_add(createdAt, interval 8 hour))) as chatdate from chat_orders where first_audiob=0 and date((date_add(createdAt, interval 8 hour)))=? group by chatdate", //盲人端音频出问题
    "blindvideo" : "select count(*) as blindvideo,date((date_add(createdAt, interval 8 hour))) as chatdate from chat_orders where first_videob=0 and date((date_add(createdAt, interval 8 hour)))=? group by chatdate", //盲人端视频出问题
    "calldetail" : "SELECT caller_tel, u.name AS caller_name, callee_tel, hangup_reason, call_time, hangup_time, date_add(co.createdAt, interval '08:00:00' hour_second) AS callAt FROM re_prod.call_orders AS co, re_prod.users AS u WHERE co.user_id = u.id AND u.role=1 AND date(date_add(co.createdAt, interval '08:00:00' hour_second))=? ORDER by co.id DESC",//每日呼叫明细
    "chatdetail" : "SELECT co.chat_id, caller_tel, u.name AS caller_name, callee_tel, hangup_reason, call_time, hangup_time, ch.duration AS duration, ua, ub, date_add(co.createdAt, interval '08:00:00' hour_second) AS callAt FROM re_prod.call_orders AS co, re_prod.users AS u, re_prod.chat_orders as ch WHERE co.chat_id = ch.chat_id AND co.user_id = u.id AND u.role=1 AND date(date_add(co.createdAt, interval '08:00:00' hour_second))=? ORDER by co.id DESC",//接通明细 
};