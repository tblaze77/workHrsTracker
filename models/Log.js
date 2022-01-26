const mongoose = require ('mongoose');


const Log = mongoose.model('Log', {
    type: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    timestamp: { 
        type : Date, 
        default: Date.now,
        required: true
    }
});

module.exports = {Log}