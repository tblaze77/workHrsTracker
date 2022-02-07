const { Log } = require("../models/Log");

const checkArrival = async (log) => {
  let logs = await Log.find({ user: log.user }).exec();
  if (!logs.length && log.type == "ARRIVAL") return true;
  return false;
};

module.exports = checkArrival;
