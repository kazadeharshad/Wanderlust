module.exports.isLoggedIn = (req,res,next)=> {
     if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You are not Logged In, Please login first");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.redirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}