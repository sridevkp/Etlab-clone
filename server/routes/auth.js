const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")


router.post( "/login", authController.handleLogin  )
    .delete("/logout", authController.handleLogout )
    .post("/token",    authController.refreshToken )

module.exports = router