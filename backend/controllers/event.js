const { request } = require("express");
const Event = require("../models/Event.Model");

exports.createEvent = async (req, res)=>{
    try{
        const {title, description, shortDescription, date, location} = req.body;
        if(!title || !description || !shortDescription || !date || !location){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const newEvent = new Event({
           title,
           description,
           shortDescription,
           date,
           location,
        });
        await newEvent.save();
      return res
      .status(201)
      .json({status:"Y", message: "Event Created Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.getEvent = async (req, res)=>{
     try{
        const events = await Event.find();
        if(!events || events.length ===0){
            return res.status(400).json({status: "Y", message: "No data found"});
        }
        return res
        .status(200)
        .json({status:"Y", message: "Success", data: events });
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.deleteEvent = async (req, res)=> {
    let id = req.params.id;
    try{
        const event = await Event.findByIdAndDelete(id);
        if(!event){
            return res.status(404).json({status: "N", message: "No Event found"});

        }
        return res
        .status(200)
        .json({status:"Y", message: "Event Deleted Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};

exports.updateEvent = async (req, res)=> {
    let id = req.params.id;
    console.log(req.body);
    try{
        // const {title, description, shortDescription, date, location} = req.body;
        if (!('title' in req.body || 'description' in req.body || 'shortDescription' in req.body || 'date' in req.body || 'location' in req.body)){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({status: "N", message: "No Event found"});

        }
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body);
        if(updatedEvent){
            return res
            .status(200)
            .json({status:"Y", message: "Event Updated Successfully"});
        }
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};
