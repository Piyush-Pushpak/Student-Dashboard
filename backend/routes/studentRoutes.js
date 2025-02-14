const express = require("express");
const { registerStudent, loginStudent, getStudentProfile, updateStudentProfile, getStudentApplications, addApplication } = require("../controllers/studentController");
const isLoggedin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", isLoggedin, getStudentProfile);
router.put("/profile", isLoggedin, updateStudentProfile);
router.get("/applications", isLoggedin, getStudentApplications);
router.post("/applications", isLoggedin, addApplication);

module.exports = router;