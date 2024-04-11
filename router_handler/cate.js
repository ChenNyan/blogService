const db = require("../db/index")

const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")
const config = require("../config")

exports.addCate = (req, res) => {
  let {cate_name} = req.body
  if(!cate_name) return res.output("请传递分类名",400, {})
  const sql = "select cate_name from catedata where cate_name=?"

  db.query(sql, cate_name, (err, results) => {
    if (err) return res.output(err, 400, {})
    if (results.length === 1) return res.output("此分类已存在",400, {})

    const sqlStr = "insert into catedata set ?"
    db.query(sqlStr, {cate_name}, (err, results) => {
      if (err) return res.output(err,400, {})
      if (results.affectedRows !== 1) return res.output("新增失败",400, {})
      return res.output("新增成功",200, {})
    })
  })
}

exports.getCate = (req, res) => {
  let {page, size} = req.query
  if(!page || !size) return res.output('请传递分页数据',400,{})
  const sql = `select * from catedata limit ${(page - 1) * size}, ${size}`
  db.query(sql, (err, results) => {
    if(err) return res.output(err, 400, {})
    const countSql = `select count(*) as total from catedata`
    db.query(countSql, (err1, count) => {
      if(err1) return res.output(err, 400, {})
      return res.output('查询成功', 200, {
        data:results,
        count:count[0].total
      })
    })
  })
}

exports.delCate = (req, res) => {
  let {id} = req.body
  if(!id) return res.output("请传递ID",400, {})
  const sql = "delete from catedata where id=?"

  db.query(sql, id, (err, results) => {
    if (err) return res.output(err, 400, {})
    return res.output("删除成功",200, {})
  })
}

exports.editCate = (req, res) => {
  let {id,cate_name} = req.body
  if(!id) return res.output("请传递ID",400, {})
  if(!cate_name) return res.output("请传递新分类名",400, {})
  const sql = `update catedata set cate_name="${cate_name}" where id=${id}`

  db.query(sql, (err, results) => {
    if (err) return res.output(err, 400, {})
    return res.output("更新成功",200, {})
  })
}
