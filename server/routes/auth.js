const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")


router.route("/")
    .post(   authController.handleLogin  )
    .delete( authController.handleLogout )

router.post("/google", authController.handleGoogleLogin )

router.get("/refresh", authController.refreshToken )

module.exports = router