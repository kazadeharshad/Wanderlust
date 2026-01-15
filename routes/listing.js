const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController = require("../controller/listing.js");

//index route
router.route("/")
    .get( wrapAsync( listingController.index))
    .post(validateListing, isLoggedIn, wrapAsync(listingController.createNewListing));

router.route("/new")
.get( isLoggedIn, listingController.renderNewForm);

//show listing route
router.route("/:id")
    .get( wrapAsync(listingController.showListings))
    .put(validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));

//edit listing route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;