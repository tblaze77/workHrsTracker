const { models } = require("mongoose");
const { Employee } = require("../models/Employee");
const { Log } = require("../models/Log");

const checkLogPosibility = ({ logType, username }) => {
  Log.find({ username }, (err, data) => {
    console.log(data);
  });
};

module.exports = checkLogPosibility;
