const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")


router.route("/")
    .post(   authController.handleLogin  )
    .delete( authController.handleLogout )

router.get("/google"  , authController.generateOAuthUrl )

router.get("/google/cb", authController.handleOAuthCallback )

router.get("/refresh"  , authController.refreshToken )

module.exports = router