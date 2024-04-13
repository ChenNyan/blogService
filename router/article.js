const express = require("express")
const router = express.Router()


const article_handler = require("../router_handler/article")

router.post("/addArticle", article_handler.addArticle)
router.get("/getArticle", article_handler.getArticle)
router.post("/delArticle", article_handler.delArticle)
router.post("/editArticle", article_handler.editArticle)


module.exports = router