const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage,
    // limits:{
    // fileSize: 1024 * 1024 * 5,
    // }
 });


router.route("/")
    .get( wrapAsync( listingController.index))
  .post(
  isLoggedIn,
  upload.single("listing[image]"),
 validateListing,
  wrapAsync(listingController.createNewListing)
);
    // .post( isLoggedIn, 
    //     upload.single('listing[image]'), 
    //     validateListing, wrapAsync(listingController.createNewListing));

router.route("/new")
.get( isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get( wrapAsync(listingController.showListings))
    .put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;