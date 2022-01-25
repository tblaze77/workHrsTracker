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
    qrcode: {
        type: String,
        required: true
    },
    adminRole: {
        type: Boolean,
        required: true
    }
});

module.exports = {Employee}