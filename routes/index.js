const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;   
const QRcode = require('../qrcode/generator');
const {Employee} = require('../models/Employee');
const {Log} = require('../models/Log');
const logTypes = require('../helper/constants');

router.get('/', (req,res) => {
    res.send("aplikacija")
})
//get Logs

// Save Employee
router.post('/employee',async (req, res) => {

    let splittedQr = null;
    await QRcode(req.body.username).then(image => {
        splittedQr = image.split(',')[1];    
    }).catch(err => console.log(err));

   
    const employee = new Employee({
        username: req.body.username,
        password: req.body.password,
        qrCode: splittedQr,
        adminRole : req.body.adminRole
    });
    
    employee.save((err, data) => {
        if(!err) {
            
            res.status(200).json({code: 200, message: 'Employee Added Successfully', data: splittedQr})
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

//check if employee exists in database
router.post('/scan', (req,res) => {
   // const possibleUsername = req.body.qrCode;
   Employee.findOne({qrCode: req.body.qrCode}, (err,data) => {
       let splittedQr;
       if(data != null){
            let returnObject={};
            console.log(data);
            
            if(logTypes.includes(req.body.logType)){
                returnObject = {
                                     status: "Approved",
                     }
                     const log = new Log({
                        user: data.username,
                        type: req.body.logType,
                    });
                    log.save((err, data) => {
                        if(err) {
                            
                           console.log(err);
                        }
                    });
                     res.status(200).send(log)
            }else{
                res.status(404).send({
                    status: "Denied",
                    message: "Log Type doesn't exist"
                })
            }
              
           
           if(logTypes.includes(req.body.logType));
        
       } else {
           
           res.status(404).send({
               status: "Denied",
               message: "Wrong QR Code (Unauthorized)"
           })
       }
   })

})

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