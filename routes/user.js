const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {redirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.get("/signup",userController.renderSignupForm);

router.post("/signup", userController.signUp);

router.get("/login", userController.renderLiginForm);

router.post("/login",
    redirectUrl,
    passport.authenticate("local", {
        failureRedirect:"/listings",
        failureFlash : true
    }), userController.login
   );

router.get("/logout", userController.logout)

module.exports = router;