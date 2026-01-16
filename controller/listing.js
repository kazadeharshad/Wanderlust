const Listing = require("../models/listing.js");
const axios = require("axios");


module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings});
}

module.exports.showListings = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path : "author"}}).populate("owner");
    //console.log (listing);
    
    if(!listing){
        req.flash("error","Listing you Requsted for does not Exists!");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs", {listing});
    }
}

module.exports.renderNewForm = (req,res) => {
   res.render("listings/new.ejs");
}

module.exports.createNewListing =  async (req,res,next) => {


  //console.log(result.data[0]);
    let newListing = Listing(req.body.listing);
    const result = await axios.get(
    "https://us1.locationiq.com/v1/search",
    {
      params: {
        key: process.env.MAP_TOKEN,
        q: newListing.location,
        format: "json",
        limit: 1
      }
    }
  );
    newListing.owner = req.user._id;
    //console.log(newListing.owner); 
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url, filename};
    newListing.geometry = {type : 'Point', coordinates: [result.data[0].lon,result.data[0].lat]};
    saveedListing = await newListing.save();
    console.log(saveedListing);
    req.flash("success", "New Listing added!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs",{listing, originalUrl});
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
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}