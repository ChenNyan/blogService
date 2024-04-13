const express = require("express")
const app = express()
const joi = require("joi")

app.use(express.urlencoded({extended: false}));
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


app.use((req, res, next) => {
  // 定义一个输出的函数
  res.output = function (err, code = 1, data) {
    res.send({
      code,
      msg: err instanceof Error ? err.message : err,
      data,
    });
  };
  next();
})

const jwt = require("express-jwt")
const config = require("./config")
app.use(
  jwt({secret: config.jwtSecretKey,requestProperty: 'token', algorithms: ["HS256"],getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.token) {
        return req.headers.token
      }
      return null
    }}).unless({
    path: ['/register', '/login'],
  })
)

const loginRouter = require("./router/login")
app.use(loginRouter)
const infoRouter = require("./router/userInfo")
app.use(infoRouter)
const cateRouter = require("./router/cate")
app.use(cateRouter)
const articleRouter = require("./router/article")
app.use(articleRouter)

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.output(err);
  res.output(err, 200);
  next();
})

app.listen(3007, () => {
  console.log("Server running at http://127.0.0.1:3007");
});