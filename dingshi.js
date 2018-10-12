const schedule = require('node-schedule');
var exec = require('child_process').exec;

const  scheduleCronstyle = ()=>{
  //每天凌晨两点定时执行一次:
    schedule.scheduleJob({hour: 11, minute: 00,second:00},()=>{
        exec('node tongji.js',function(error, stdout, stderr){
            if(error) {
                console.error('error: ' + error);
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + typeof stderr);
            console.log('执行成功');
        });
    }); 
}

scheduleCronstyle();