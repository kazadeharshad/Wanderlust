const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isAuthor} =require("../middleware.js");
const reviewController = require("../controller/review.js")

//post review route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.addReview));

//delete review route 
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;