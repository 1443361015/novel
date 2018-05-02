var OptPool = require('./OptPool');  //引入连接池
var optPool = new OptPool();
var pool = optPool.getPool();

var url = require('url');
//引入querystring模块处理query字符串
var querystring = require('querystring');

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {

                if (err) {
                    console.log(err);
                }


                cb(err, rows);

                conn.release();
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};