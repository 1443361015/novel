var mysql =require("mysql");
var databaseConfig = require('./database.config'); //数据库配置信息
function OptPool(){
    this.flag = true; //是否连接过
    this.pool = mysql.createPool(databaseConfig);
    this.getPool = function(){
        if(this.flag) {
            this.pool.on('connection',function(connection){
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            })
        }
        return this.pool;
    }
}
module.exports = OptPool;