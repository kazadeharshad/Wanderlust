const User = require("../models/user.js");

module.exports.renderSignupForm = async(req, res) => {
    return res.render("../views/users/signUp.ejs");
}

module.exports.signUp = async(req,res,next) => {
    try{
        let {username, email, password} = req.body;
        let newUser = new User ({
            email : email,
            username : username
        });
        let registereduser = await User.register(newUser,password);
        req.login(registereduser,(err) => {
            req.flash("success", "welcome to wanderlust");
            return res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error",e.message);
        return res.redirect("/user/signup")
    }
}

module.exports.renderLiginForm =  (req,res) => {
    return res.render("../views/users/login.ejs")
}

module.exports.login =  async (req,res) => {
        req.flash("success", "Welcome to wanderlust! You are Logged In");
        let url = res.locals.redirectUrl;
        return res.redirect(url || "/listings");
}

module.exports.logout = (req,res, next) => {
    req.logOut((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged out!");
        return res.redirect("/listings");
    })
}