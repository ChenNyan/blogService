const db = require("../db/index")

const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")
const config = require("../config")

exports.addArticle = (req, res) => {
  let {content} = req.body
  if(!content) return res.output("请传递内容",400, {})
  const sql = "insert into articledata set ?"

  db.query(sql, {content}, (err, results) => {
    if (err) return res.output(err,400, {})
    if (results.affectedRows !== 1) return res.output("新增失败",400, {})
    return res.output("新增成功",200, {})
  })
}

exports.getArticle = (req, res) => {
  let {page, size} = req.query
  if(!page || !size) return res.output('请传递分页数据',400,{})
  const sql = `select * from articledata limit ${(page - 1) * size}, ${size}`
  db.query(sql, (err, results) => {
    if(err) return res.output(err, 400, {})
    const countSql = `select count(*) as total from articledata`
    db.query(countSql, (err1, count) => {
      if(err1) return res.output(err, 400, {})
      return res.output('查询成功', 200, {
        data:results,
        count:count[0].total
      })
    })
  })
}

exports.delArticle = (req, res) => {
  let {id} = req.body
  if(!id) return res.output("请传递ID",400, {})
  const sql = "delete from articledata where id=?"

  db.query(sql, id, (err, results) => {
    if (err) return res.output(err, 400, {})
    return res.output("删除成功",200, {})
  })
}

exports.editArticle = (req, res) => {
  let {id,content} = req.body
  if(!id) return res.output("请传递ID",400, {})
  if(!content) return res.output("请传递新分类名",400, {})
  const sql = `update articledata set content="${content}" where id=${id}`

  db.query(sql, (err, results) => {
    if (err) return res.output(err, 400, {})
    return res.output("更新成功",200, {})
  })
}
