const express = require("express");
const router = express.Router();
const {
    createTeacher, 
    getTeacher, 
    deleteTeacher,
    updateTeacher,

} = require("../controllers/teacher");
const authenticateJWT = require("../middleware/auth.middleware");



router.post("/", authenticateJWT, createTeacher);
router.get("/",  getTeacher);
router.delete("/:id",authenticateJWT, deleteTeacher);
router.put("/:id",authenticateJWT, updateTeacher);

module.exports = router;    