const db = require("../db/index")

const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")
const config = require("../config")

exports.userRegister = (req, res) => {
  let {username, password} = req.body

  const sql = "select username from userdata where username=?"

  db.query(sql, username, (err, results) => {
    if (err) return res.output(err, 400, {})
    if (results.length === 1) return res.output("用户名已存在",400, {})

    console.log("原始数据", password)
    password = bcryptjs.hashSync(password, 10)
    console.log("加密数据", password)
    const sqlStr = "insert into userdata set ?"
    db.query(sqlStr, {username, password}, (err, results) => {
      if (err) return res.output(err,400, {})
      if (results.affectedRows !== 1) return res.output("用户注册失败",400, {})
      res.output("注册成功",200, {})
    })
  })
}

exports.userLogin = (req, res) => {
  const {username, password} = req.body
  const sql = "select * from userdata where username=?"
  db.query(sql, username, (err, results) => {
    if(err) return res.output(err, 400, {})
    if(results.length !== 1) return res.output("登录失败", 400, {})
    const compareResult = bcryptjs.compareSync(password, results[0].password)
    if(!compareResult) return res.output('密码错误，登录失败！',400,{})
    const user = {...results[0], password:""}
    const tokenStr = jwt.sign({id:user.id},config.jwtSecretKey, {})
    res.output("登录成功", 200, {
      username:username,
      token:tokenStr
    })
  })
}