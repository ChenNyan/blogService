const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1', //数据库的IP地址
  user: 'root',
  password: '123456',
  database: 'blog', //指定要操作哪个数据库
})

module.exports = db