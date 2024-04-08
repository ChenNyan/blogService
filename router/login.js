const express = require("express")
const router = express.Router()

const expressJoi = require("@escook/express-joi")

const {login_rules} = require("../schema/login")

const login_handler = require("../router_handler/login")

router.post("/register", expressJoi(login_rules), login_handler.userRegister)

router.post("/login", expressJoi(login_rules),login_handler.userLogin)

module.exports = router