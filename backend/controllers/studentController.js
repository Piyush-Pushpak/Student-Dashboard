const Student = require("../models/Student");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Student
const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const studentExists = await Student.findOne({ email });
        if (studentExists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, student });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login Student
const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, student });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Student Profile
const getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select("-password");
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update Student Profile
const updateStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;

        if (req.body.password) {
            student.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Student Applications
const getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ studentId: req.student.id });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Add New Application
const addApplication = async (req, res) => {
    const { title, description } = req.body;
    try {
        const application = await Application.create({ studentId: req.student.id, title, description });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerStudent, loginStudent, getStudentProfile, updateStudentProfile, getStudentApplications, addApplication };