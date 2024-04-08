
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const express = require('express')
// 创建路由模块
const router = express.Router()

// 导入用户信息的处理函数模块
const userInfo_handler = require('../router_handler/userInfo')
// 获取用户的基本信息
router.get('/userInfo', userInfo_handler.getUserInfo)
// 修改信息
// 向外共享路由对象
module.exports = router