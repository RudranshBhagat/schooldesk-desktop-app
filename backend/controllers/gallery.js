const { request } = require("express");
const Gallery = require("../models/Gallery.Model");

exports.createGallery = async (req, res)=>{
    try{
        const {title, imagesUrl,  date,  } = req.body;
        if(!title   || !imagesUrl || !date){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const newGallery = new Gallery({
           title,
           imagesUrl,
           date,
        });
        await newGallery.save();
      return res
      .status(201)
      .json({status:"Y", message: "Gallery Created Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.getGallery = async (req, res)=>{
     try{
        const gallery = await Gallery.find();
        if(!gallery || gallery.length ===0){
            return res.status(400).json({status: "Y", message: "No data found"});
        }
        return res
        .status(200)
        .json({status:"Y", message: "Success", data: gallery });
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.deleteGallery = async (req, res)=> {
    let id = req.params.id;
    try{
        const gallery = await Gallery.findByIdAndDelete(id);
        if(!gallery){
            return res.status(404).json({status: "N", message: "No Gallery found"});

        }
        return res
        .status(200)
        .json({status:"Y", message: "Gallery Deleted Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};

exports.updateGallery = async (req, res)=> {
    let id = req.params.id;
    console.log(req.body);
    try{
        // const {title, description, shortDescription, date, location} = req.body;
        if (!('title' in req.body || 'date' in req.body || 'imagesUrl' in req.body)){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const gallery = await Gallery.findById(id);
        if(!gallery){
            return res.status(404).json({status: "N", message: "No Gallery found"});

        }
        const updatedGallery = await Gallery.findByIdAndUpdate(id, req.body);
        if(updatedGallery){
            return res
            .status(200)
            .json({status:"Y", message: "Gallery Updated Successfully"});
        }
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};
