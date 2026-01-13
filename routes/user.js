const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const {redirectUrl} = require("../middleware.js");

router.get("/signup",async(req, res) => {
    res.render("../views/users/signUp.ejs");
});

router.post("/signup", async(req,res,next) => {
    try{
        let {username, email, password} = req.body;
        let newUser = new User ({
            email : email,
            username : username
        });
        let registereduser = await User.register(newUser,password);
        req.login(registereduser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust");
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/user/signup")
    }
});

router.get("/login", (req,res) => {
    res.render("../views/users/login.ejs")
});

router.post("/login",
    redirectUrl,
    passport.authenticate("local", {
        failureRedirect:"/listings",
        failureFlash : true
    }),
    async (req,res) => {
        req.flash("success", "Welcome to wanderlust! You are Logged In");
        let url = res.locals.redirectUrl;
        res.redirect(url || "/listings");
});

router.get("/logout", (req,res) => {
    req.logOut((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged out!");
        res.redirect("/listings");
    })
})

module.exports = router;