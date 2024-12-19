require('../config/dataBase')
const mongoose = require('mongoose')


const serviceSchema = new mongoose.Schema({
    uniqueid: { type: String, default: '' },
    createDate: { type: Date, default: Date.now() },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    description: { type: String, default: '' },
    frequency: [{
        name: { type: String, default: '' },
        price: { type: Number, default: 0 },
    }]
})

const adminSchema = new mongoose.Schema({

username: { type: String, default: '' },
email: { type: String, default: '' },
password: { type: String, default: '' },
customServices: [serviceSchema]

}, { collection : "adminData" });

module.exports = mongoose.model('adminData', adminSchema);  