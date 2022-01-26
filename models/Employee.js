const mongoose = require ('mongoose');


const Employee = mongoose.model('Employee', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    adminRole: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = {Employee}