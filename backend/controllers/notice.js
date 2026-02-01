const { request } = require("express");
const Notice = require("../models/Notice.Model");

exports.createNotice = async (req, res)=>{
    try{
        const {title, description,  date, category } = req.body;
        if(!title   || !description ||!category || !date){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const newNotice = new Notice({
           title,
           description,
           date,
           category
        });
        await newNotice.save();
      return res
      .status(201)
      .json({status:"Y", message: "Notice Created Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.getNotice = async (req, res)=>{
     try{
        const notice = await Notice.find();
        if(!notice || notice.length ===0){
            return res.status(400).json({status: "Y", message: "No data found"});
        }
        return res
        .status(200)
        .json({status:"Y", message: "Success", data: notice });
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.deleteNotice = async (req, res)=> {
    let id = req.params.id;
    try{
        const notice = await Notice.findByIdAndDelete(id);
        if(!notice){
            return res.status(404).json({status: "N", message: "No Notice found"});

        }
        return res
        .status(200)
        .json({status:"Y", message: "Notice Deleted Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};

exports.updateNotice = async (req, res)=> {
    let id = req.params.id;
    console.log(req.body);
    try{
        // const {title, description, shortDescription, date, location} = req.body;
        if (!('title' in req.body || 'date' in req.body || 'category' in req.body || 'description' in req.body)){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const notice = await Notice.findById(id);
        if(!notice){
            return res.status(404).json({status: "N", message: "No Notice found"});

        }
        const updatedNotice = await Notice.findByIdAndUpdate(id, req.body);
        if(updatedNotice){
            return res
            .status(200)
            .json({status:"Y", message: "Notice Updated Successfully"});
        }
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};
