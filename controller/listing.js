const Listing = require("../models/listing.js");
const axios = require("axios");
const streamifier = require("streamifier");
const { cloudinary } = require("../cloudconfig.js");


module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    return res.render("listings/index.ejs", {listings});
}

module.exports.showListings = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path : "author"}}).populate("owner");
    //console.log (listing);
    
    if(!listing){
        req.flash("error","Listing you Requsted for does not Exists!");
        return res.redirect("/listings");
    }else{
        return res.render("listings/show.ejs", {listing});
    }
}

module.exports.renderNewForm = (req,res) => {
   return res.render("listings/new.ejs");
}

module.exports.createNewListing =  async (req,res,next) => {
    try {
        let newListing = new Listing(req.body.listing);
        
        console.log("AFTER GEOLOCATION");
      
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url, filename};
        newListing.owner = req.user._id;
        const result = await axios.get(
        "https://us1.locationiq.com/v1/search",
        {
          params: {
            key: process.env.MAP_TOKEN,
            q: newListing.location,
            format: "json",
            limit: 1
          },
          timeout: 20000
        }
      );
        newListing.geometry = {type : 'Point', coordinates: [result.data[0].lon,result.data[0].lat]};
        const savedListing = await newListing.save();
        console.log("SAVED LISTING IMAGE:", savedListing.image);
        req.flash("success", "New Listing added!");
        return res.redirect("/listings");
    } catch(err) {
        req.flash("error", "Error: " + (err.message || "Could not create listing"));
        return res.redirect("/listings/new");
    }
}



module.exports.renderEditForm = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250")
    return res.render("listings/edit.ejs",{listing, originalUrl});
}

module.exports.updateListing = async (req,res) =>{
    if(! req.body){
        throw(new ExpressError(400,"send valid data for listing"));
    }
    let id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        //console.log(listing.image);
        listing.image = { url, filename};
        await listing.save();
    }
    req.flash("success", "Listing edited!");
    return res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    return res.redirect("/listings");
}