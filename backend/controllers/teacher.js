const { request } = require("express");
const Teacher = require("../models/Teacher.Model");

exports.createTeacher = async (req, res)=>{
    try{
        const {name, subject,  designation, bio, image } = req.body;
        if(!name   || !subject ||!designation || !bio || !image){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const newTeacher = new Teacher({
          name, 
          subject,  
          designation, 
          bio, 
          image
        });
        await newTeacher.save();
      return res
      .status(201)
      .json({status:"Y", message: "Teacher Added Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.getTeacher = async (req, res)=>{
     try{
        const teacher = await Teacher.find();
        if(!teacher || teacher.length ===0){
            return res.status(400).json({status: "Y", message: "No Teacher Found"});
        }
        return res
        .status(200)
        .json({status:"Y", message: "Success", data: teacher });
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
};

exports.deleteTeacher = async (req, res)=> {
    let id = req.params.id;
    try{
        const teacher = await Teacher.findByIdAndDelete(id);
        if(!teacher){
            return res.status(404).json({status: "N", message: "No Teacher found"});

        }
        return res
        .status(200)
        .json({status:"Y", message: "Teacher Deleted Successfully"});
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};

exports.updateTeacher = async (req, res)=> {
    let id = req.params.id;
    console.log(req.body);
    try{
        // const {title, description, shortDescription, date, location} = req.body;
        if (!('name' in req.body || 'subject' in req.body || 'designation' in req.body || 'bio' in req.body || 'image' in req.body)){
            return res
            .status(400)
            .json({status:"N", error: "all fields are required"}); 
        }
        const teacher = await Teacher.findById(id);
        if(!teacher){
            return res.status(404).json({status: "N", message: "No Teacher found"});

        }
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body);
        if(updatedTeacher){
            return res
            .status(200)
            .json({status:"Y", message: "Teacher Updated Successfully"});
        }
    }catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }

};
