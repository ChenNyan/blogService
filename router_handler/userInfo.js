
// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcryptjs = require('bcryptjs')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  console.log(req.user)
  const sql = "select * from userdata where id=?"
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.output(err, 400, {})
    if(results.length !== 1) return res.output("查询失败", 400, {})

    const user = results[0]
    res.output("查询成功",200,{
      id:user.id,
      username:user.username
    })
  })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  // 定义sql语句
  const sqlStr = 'update users set ? where id=?'
  // 执行sql语句并传递参数
  db.query(sqlStr, [req.body, req.body.id], (err, results) => {
    // 失败
    if (err) return res.cc(err)
    //执行成功  但影响行数不为1
    if (results.affectedRows !== 1) return res.cc('更新用户信息失败！')
    res.cc('更新用户信息成功！', 0)
  })
}

// 重置密码
exports.updatePassword = (req, res) => {
  // console.log(req);
  // 根据id查询用户信息
  const sql = 'select * from users where id=?'
  // 执行sql语句
  db.query(sql, req.user.id, (err, results) => {
    // 查询出错
    if (err) return res.cc(err)
    // 查询成功 但条数不等于1
    if (results.length !== 1) return res.cc('用户不存在')
    // 判断用户输入的旧密码是否正确
    // 不能直接判断  数据库中存加密后的密码
    const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')
    const sameCompare = bcryptjs.compareSync(req.body.newPwd, results[0].password)
    if (sameCompare) return res.cc('新密码不能和原密码相同！')
    // console.log(sameCompare);
    // 将新密码更新到数据库中
    // 更新密码sql语句
    const sql = 'update users set password=? where id=?'
    // 对新密码进行加密处理
    const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // 执行sql语句失败
      if (err) return res.cc(err)
      // 执行成功 但修改的条数不为1，没有修改
      if (results.affectedRows !== 1) return res.cc('修改密码失败')
      // 修改密码成功
      res.cc('修改密码成功', 0)
    })
  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  // 定义更新头像的sql
  const sql = 'update users set avatar=? where id=?;'
  // console.log(req);
  // console.log(req.body.id)
  // console.log(req.file);
  // console.log(req.file.destination);
  const avatarUrl = `http://127.0.0.1:3007/${req.file.destination.split('/')[1]}/${req.file.originalname}`
  // console.log(avatarUrl);
  // 执行sql语句
  db.query(sql, [avatarUrl, req.body.id], (err, results) => {
    // sql语句执行错误
    if (err) return res.cc(err)
    // sql语句执行成功，但影响的条数部位1属于执行失败
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 更换头像成功
    res.cc('更换头像成功！', 0)
  })
}