const express = require("express");
const router = express.Router();
const {
    createNotice, 
    getNotice, 
    deleteNotice,
    updateNotice,

} = require("../controllers/notice");
const authenticateJWT = require("../middleware/auth.middleware");



router.post("/", authenticateJWT, createNotice);
router.get("/", getNotice);
router.delete("/:id",authenticateJWT, deleteNotice);
router.put("/:id",authenticateJWT, updateNotice);

module.exports = router;    