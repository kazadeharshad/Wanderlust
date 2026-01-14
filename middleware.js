const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const {reviewSchema }= require("./Schema.js");
const {listingSchema }= require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js")

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

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not a owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview = (req,res,next) => {
    let {error, value} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not a owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}