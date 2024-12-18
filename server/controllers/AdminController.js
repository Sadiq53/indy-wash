const route = require('express').Router()
const adminData = require('../model/adminSchema')
const sha = require('sha1')
const jwt = require('jsonwebtoken')
require('dotenv').config()


route.get('/', async(req, res) => {
    const getAdmin = await adminData.find({})
    res.status(200).send({ success : true, result: getAdmin[0] })
})

route.post('/', async(req, res) => {
    const { email, password } = req.body
    const getAdmin = await adminData.findOne({email})
    if(getAdmin) {
        if(getAdmin?.password === sha(password)) {
            const ID = {id : getAdmin?._id};
            const token = jwt.sign(ID, process.env.TOKEN_KEY)
            res.status(200).send({ success: true, token })
        } else res.status(402).send({ success: false, type: 'password' })
    } else res.status(402).send({ success: false, type: 'email' })
})

route.put('/', async(req, res) => {

})

route.delete('/', async(req, res) => {

})



module.exports = route;