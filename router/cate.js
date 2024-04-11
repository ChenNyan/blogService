const express = require("express")
const router = express.Router()


const cate_handler = require("../router_handler/cate")

router.post("/addCate", cate_handler.addCate)
router.get("/getCate", cate_handler.getCate)
router.post("/delCate", cate_handler.delCate)
router.post("/editCate", cate_handler.editCate)


module.exports = router