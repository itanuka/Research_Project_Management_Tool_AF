let Student = require("../models/Student.js");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// REGISTER A STUDENT
exports.registerStudent = catchAsyncErrors((req, res) => {

    const { name, idNumber, degree, specialization, password, email } = req.body;

    const newStudent = new Student({
        name,
        idNumber,
        degree,
        specialization,
        password,
        email
    });

    newStudent.save()
    res.json(newStudent)
});


// GET ALL STUDENTS
exports.getAllStudents = catchAsyncErrors(async (req, res) => {

    try {
        Student.find({}, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
});



// GET A STUDENT
exports.getStudent = catchAsyncErrors(async (req, res) => {
    let studentId = req.params.id;

    try {
        Student.findOne({ _id: studentId }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
});


// GET A STUDENT using UserID
exports.getStudentUsingUserID = catchAsyncErrors(async (req, res) => {
    // let studentUserID = req.params.userID;
    const studentUserID = req.params.userID

    try {
        Student.findOne({ idNumber: studentUserID }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                // res.json(result)
                res.json(result);
            }
        })
    } catch (error) {
        console.error(error)
    }
});

// UPDATE STUDENT DETAILS
exports.updateStudent = catchAsyncErrors(async (req, res) => {

    let studentId = req.params.id;

    const { name, idNumber, degree, specialization, password, role, email } = req.body;

    const updateStudent = {
        name,
        idNumber,
        degree,
        specialization,
        password,
        role,
        email
    };

    try {
        Student.updateOne({ _id: studentId }, updateStudent, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
});


// DELETE STUDENT
exports.deleteStudent = catchAsyncErrors(async (req, res) => {
    let studentID = req.params.id;

    try {
        Student.deleteOne({ _id: studentID }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
});


