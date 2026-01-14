const Listing = require("../models/listing.js");

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
    
    let newListing = Listing(req.body.listing);
    newListing.owner = req.user._id;
    //console.log(newListing.owner);
    await newListing.save();
    req.flash("success", "New Listing added!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}

module.exports.updateListing = async (req,res) =>{
    if(! req.body){
        throw(new ExpressError(400,"send valid data for listing"));
    }
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing edited!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}