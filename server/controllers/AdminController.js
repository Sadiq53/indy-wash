const route = require('express').Router()
const adminData = require('../model/adminSchema')


route.get('/', async(req, res) => {
    const getAdmin = await adminData.find({})
    res.status(200).send({ success : true, result: getAdmin[0] })
})

route.post('/', async(req, res) => {

})

route.put('/', async(req, res) => {

})

route.delete('/', async(req, res) => {

})



module.exports = route;