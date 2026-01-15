const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {redirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signUp);

router.route("/login")
    .get( userController.renderLiginForm)
    .post(redirectUrl,
    passport.authenticate("local", {
        failureRedirect:"/listings",
        failureFlash : true
    }), userController.login
   );

router.get("/logout", userController.logout)

module.exports = router;