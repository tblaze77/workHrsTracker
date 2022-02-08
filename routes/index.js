const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const QRcode = require('../qrcode/generator');
const { Employee } = require('../models/Employee');
const { Log } = require('../models/Log');
const logTypes = require('../helper/constants');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const check = require('../helper/check');

router.get('/', (req, res) => {
  res.send('ja sam test deploya');
});
//get Logs

// Save Employee
router.post('/register', async (req, res) => {
  let splittedQr = null;
  await QRcode(req.body.username)
    .then((image) => {
      splittedQr = image.split(',')[1];
    })
    .catch((err) => console.log(err));

  const userToken = jwt.sign(
    { username: req.body.username, password: req.body.password },
    process.env.TOKEN_KEY,
    { expiresIn: '24h' }
  );

  const employee = new Employee({
    username: req.body.username,
    password: req.body.password,
    qrCode: splittedQr,
    adminRole: req.body.adminRole,
    token: userToken,
  });

  employee.save((err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: 'Employee Added Successfully',
        data: data,
      });
    } else {
      console.log(err);
    }
  });
});

//Get all employees

router.get('/employees', (req, res) => {
  Employee.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//list indivdual logs of every employee by his ID
router.get('/logs/:id', (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (data) {
      let username = data.username;
      Log.find({ user: data.username }, (err, data) => {
        if (Object.keys(data).length === 0) {
          console.log(data);
          res.status(404).send('There are no logs for user ' + username);
        } else {
          res.status(200).send(data);
        }
      });
    } else {
      res.status(404).send('employee non existent');
    }
  });
});

//get specific employee
router.get('/employee/:id', (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//check if employee exists in database
router.post('/scan', async (req, res) => {
  // const possibleUsername = req.body.qrCode;
  Employee.findOne({ qrCode: req.body.qrCode }, async (err, data) => {
    let splittedQr;
    if (data != null) {
      let returnObject = {};
      console.log(data);

      if (logTypes.includes(req.body.logType)) {
        returnObject = {
          status: 'Approved',
        };
        const log = new Log({
          user: data.username,
          type: req.body.logType,
        });

        let isFirstArrival = await check(log);
        if (isFirstArrival) {
          log.save((err, data) => {
            if (err) {
              console.log(err);
            }
          });
          res.status(200).send(returnObject);
        } else {
          res.status(400).send('Cannot Arrive twice in a row');
        }
      } else {
        res.status(404).send({
          status: 'Denied',
          message: "Log Type doesn't exist",
        });
      }

      if (logTypes.includes(req.body.logType));
    } else {
      res.status(404).send({
        status: 'Denied',
        message: 'Wrong QR Code (Unauthorized)',
      });
    }
  });
});

router.get('/logs', (req, res) => {
  Log.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
/*
router.put('/login',(req,res)=> {
    res.send('login');
})
*/

router.put('/logout', (req, res) => {
  res.send('logout');
});

//deleting employee
router.delete('/api/employee/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: 'Employee deleted', deleteEmployee: data });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
