const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;   
const QRcode = require('../qrcode/generator');
const {Employee} = require('../models/Employee');

// Save Employee
router.post('/employee', (req, res) => {
    const newQrCode = QRcode(req.body.username).toString();
    const employee = new Employee({
        username: req.body.username,
        password: req.body.password,
        qrcode: newQrCode,
        adminRole : req.body.adminRole
    });
    employee.save((err, data) => {
        if(!err) {
            
            res.status(200).json({code: 200, message: 'Employee Added Successfully', addEmployee: data})
        } else {
           console.log(err);
        }
    });
});

//Get all employees

router.get('/employees', (req, res) => {
    Employee.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

//get specific employee
router.get('/employee/:id', (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});

//deleting employee
router.delete('/api/employee/:id', (req, res) => {

    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Employee deleted', deleteEmployee: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;