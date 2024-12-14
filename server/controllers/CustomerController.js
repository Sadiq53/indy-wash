const route = require('express').Router();
const customerModel = require('../model/customerSchema')
const proposalModel = require('../model/proposalSchema')
const serviceModel = require('../model/serviceSchema')

route.get('/', async(req, res) => {
    const customer = await customerModel.find({})
    res.send({ success: true, result: customer })
})

route.post('/', async(req, res) => {
    
    const customerDetail = req.body;
    await customerModel.create(customerDetail)

    res.status(200).send({ result: customerDetail, success: true })
    // if(req.headers.authorization) {
        
    // } else res.status(401).send({message: 'Unauthorised !'})
})

route.put('/', async(req, res) => {

})

route.delete('/:id', async (req, res) => {
    const customerid = req.params.id;

    try {
        const getCustomerData = await customerModel.findOne({ uniqueid: customerid });

        if (!getCustomerData) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        const allProposals = [];
        const allServices = [];

        getCustomerData.property.forEach((property) => {
            if (property.proposal) {
                allProposals.push(...property.proposal); // Collect all proposal unique IDs
            }
            if (property.services) {
                allServices.push(...property.services); // Collect all service unique IDs
            }
        });

        if (allProposals.length > 0) {
            await proposalModel.deleteMany({ uniqueid: { $in: allProposals } });
        }

        if (allServices.length > 0) {
            await serviceModel.deleteMany({ uniqueid: { $in: allServices } });
        }

        await customerModel.deleteOne({ uniqueid: customerid });

        // Success response
        res.status(200).send({ message: 'Customer and all related proposals and services have been deleted successfully.', success: true });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'An error occurred while deleting the customer and associated data.', error: error.message });
    }
});


module.exports = route