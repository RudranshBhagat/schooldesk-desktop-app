const express = require("express");
const router = express.Router();
const {
    createEvent, 
    getEvent, 
    deleteEvent,
    updateEvent,

} = require("../controllers/event");
const authenticateJWT = require("../middleware/auth.middleware");



router.post("/",authenticateJWT, createEvent);
router.get("/", getEvent);
router.delete("/:id",authenticateJWT, deleteEvent);
router.put("/:id",authenticateJWT, updateEvent);

module.exports = router;    