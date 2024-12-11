const route = require('express').Router();
const customerData = require('../model/customerSchema')

route.get('/', async(req, res) => {
    const customer = await customerData.find({})
    res.send({ success: true, result: customer })
})

route.post('/', async(req, res) => {
    
    const customerDetail = req.body;
    await customerData.create(customerDetail)

    res.status(200).send({ result: customerDetail, success: true })
    // if(req.headers.authorization) {
        
    // } else res.status(401).send({message: 'Unauthorised !'})
})

route.put('/', async(req, res) => {

})

route.delete('/', async(req, res) => {

})

module.exports = route