const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController = require("../controller/listing.js");

//index route
router.get("/", wrapAsync( listingController.index));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show listing route
router.get("/:id", wrapAsync(listingController.showListings));

//create listing route
router.post("/", validateListing, isLoggedIn, wrapAsync(listingController.createNewListing));

//edit listing route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//update listing route
router.put("/:id", validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

//delete listing route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));

module.exports = router;