const { Log } = require('../models/Log');

module.exports = {
  checkArrival: async function (log) {
    let logs = await Log.find({ user: log.user }).exec();
    if (!logs.length) return true;
    if (!checkMultipleLogTypes(log, logs)) return false;
    return false;
  },

  checkDeparture: async function (log) {
    let logs = await Log.find({ user: log.user }).exec();
    let checkIfArrivalExists = false;
    let checkIfLunchStarted = false;
    if (!checkMultipleLogTypes(log, logs)) return false;
    console.log('tu sam');
    logs.map((log) => {
      if (log.type == 'ARRIVAL') {
        checkIfArrivalExists = true;
      }
    });

    if (logs[logs.length - 1].type == 'BREAK_START') {
      checkIfLunchStarted = true;
    }
    if (checkIfArrivalExists && !checkIfLunchStarted) return true;

    return false;
  },
  checkLunchStart: async function (log) {
    let logs = await Log.find({ user: log.user }).exec();
    if (!checkMultipleLogTypes(log, logs)) return false;
    if (
      logs.length != 0 &&
      (logs[logs.length - 1].type == 'ARRIVAL' ||
        logs[logs.length - 1].type == 'BREAK_END')
    )
      return true;
    return false;
  },
  checkLunchEnd: async function (log) {
    let logs = await Log.find({ user: log.user }).exec();
    if (!checkMultipleLogTypes(log, logs)) return false;
    if (logs.length != 0 && logs[logs.length - 1].type == 'BREAK_START')
      return true;
    return false;
  },
  checkMultipleLogTypes: checkMultipleLogTypes,
};

function checkMultipleLogTypes(log, logs) {
  if (logs.length != 0) {
    let lastlog = logs[logs.length - 1];
    if (log.type == lastlog.type) return false;
    return true;
  } else {
    return false;
  }
}
