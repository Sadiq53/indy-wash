const route = require('express').Router()
const adminModel = require('../model/adminSchema')
const customerModel = require('../model/customerSchema')
const serviceModel = require('../model/serviceSchema')
const proposalModel = require('../model/proposalSchema')
require('dotenv').config();
const multerS3 = require('multer-s3');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// AWS SDK Configuration
const s3 = new S3Client({
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
  
// Multer configuration for file storage
const storage = multerS3({
    s3: s3,
    bucket: 'jmb-enterprises-bucket',
    // acl: 'public-read',
    key: (req, file, cb) => {
        // Generate a unique name for the file
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

// Multer instance with limits and file type filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Limit to 10MB
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});




route.get('/', async(req, res) => {
    const serviceData = await serviceModel.find({})
    const proposalData = await proposalModel.find({})
    // console.log(serviceData)
    res.status(200).send({success: true, service: serviceData, proposal: proposalData})
})

route.post('/', async (req, res) => {
    const rawData = req.body;

    // Create serviceClone object
    const serviceClone = {
        uniqueid: rawData?.serviceUniqueid,
        createDate: rawData?.createDate,
        name: rawData?.serviceItem,
        type: rawData?.type,
        description: rawData?.description,
        quantity: rawData?.quantity,
        sqft: rawData?.sqft,
        frequency: rawData?.frequency,
    };

    // Create proposalClone object
    const proposalClone = {
        uniqueid: rawData?.uniqueid,
        createDate: rawData?.createDate,
        customer: rawData?.customer,
        property: rawData?.property,
        service: [rawData?.serviceUniqueid],
    };

    try {
        // Create proposal in the database
        await proposalModel.create(proposalClone);

        // Create service in the database
        await serviceModel.create(serviceClone);

        // Find customer by uniqueid
        const customer = await customerModel.findOne({ uniqueid: rawData?.customer });

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }

        // Find the property inside the customer object
        const property = customer.property.find(prop => prop.uniqueid === rawData?.property);

        if (property) {
            // Push the serviceUniqueid and proposalClone.uniqueid into the respective arrays
            property.services.push(rawData?.serviceUniqueid);
            property.proposal.push(rawData?.uniqueid);
        } else {
            return res.status(404).send({ message: 'Property not found' });
        }

        // Save the updated customer object
        await customer.save();

        res.status(200).send({ message: 'Service and Proposal added successfully', success: true, service: serviceClone, proposal: proposalClone });
    } catch (error) {
        console.error('Error in adding service and proposal:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

route.post('/extra', async (req, res) => {
    const rawData = req.body;
    const { customerid, proposalid, propertyid, uniqueid } = rawData;

    // Construct serviceClone object
    const serviceClone = {
        uniqueid,
        createDate: rawData?.createDate,
        name: rawData?.name,
        type: rawData?.type,
        description: rawData?.description,
        quantity: rawData?.quantity,
        sqft: rawData?.sqft,
        frequency: rawData?.frequency,
        activePlan: rawData?.activePlan,
    };

    try {
        // 1. Create a new service in the database
        await serviceModel.create(serviceClone);

        // 2. Add the service to the proposal
        const proposalUpdateResult = await proposalModel.updateOne(
            { uniqueid: proposalid },
            { $push: { service: uniqueid } }
        );

        if (proposalUpdateResult.modifiedCount === 0) {
            return res.status(404).send({ message: 'Proposal not found or update failed' });
        }

        // 3. Find the customer by uniqueid
        const customer = await customerModel.findOne({ uniqueid: customerid });

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }

        // 4. Find the property inside the customer object
        const property = customer.property.find((prop) => prop.uniqueid === propertyid);

        if (!property) {
            return res.status(404).send({ message: 'Property not found' });
        }

        // 5. Add service and proposal to the property
        property.services = property.services || [];
        property.services.push(uniqueid);

        // Save the updated customer object
        await customer.save();

        // 6. Send a success response
        res.status(200).send({
            message: 'Service added successfully',
            success: true,
            result: serviceClone,
        });
    } catch (error) {
        console.error('Error in adding service and proposal:', error);

        // Return a more informative error message for debugging
        res.status(500).send({
            message: 'An error occurred while adding the service and updating related data.',
            error: error.message,
        });
    }
});

route.post('/custom', async(req, res) => {
    const customServices = req.body
    await adminModel.updateOne({username: 'admin'},{$set: {customServices: customServices}})
    res.status(200).send({ success: true, result: customServices })
})

route.put('/plan', async(req, res) => {
    const { service, frequency } = req.body
    await serviceModel.updateOne({ uniqueid: service }, { $set: { activePlan: frequency } })
    res.status(200).send({success: true})
})

route.put('/', async (req, res) => {
    const allServices = req.body;

    if (!Array.isArray(allServices) || allServices.length === 0) {
        return res.status(400).json({ message: "Invalid input: Provide an array of services." });
    }

    try {
        // Use Promise.all to handle multiple updates concurrently
        const updatePromises = allServices.map(service => {
            const { uniqueid, ...updatedFields } = service; // Extract uniqueid and the fields to update
            return serviceModel.updateOne(
                { uniqueid }, // Find the service by uniqueid
                { $set: updatedFields } // Update the service with new fields
            );
        });

        // Wait for all updates to complete
        const results = await Promise.all(updatePromises);

        res.status(200).send({ message: "Services updated successfully.", success: true });
    } catch (error) {
        console.error("Error updating services:", error);
        res.status(500).send({ message: "Failed to update services.", error });
    }
});

route.put('/status', async (req, res) => {
    const { status, proposalid } = req.body;
    
    const getStatus = status ? 'active' : 'draft';

    try {
        // Update the proposal status in the database
        const result = await proposalModel.updateOne(
            { uniqueid: proposalid },
            { $set: { status: getStatus } }
        );

        // Check if any document was updated
        if (result.nModified === 0) {
            return res.status(404).send({ message: 'Proposal not found or status is already set' });
        }

        // Send success response
        res.status(200).send({ message: 'Proposal status updated successfully', success: true });
    } catch (error) {
        // Catch any errors and send a 500 response
        console.error(error);
        res.status(500).send({ message: 'Error updating proposal status' });
    }
});

route.post('/delete', async (req, res) => {
    const { serviceid, customerid, propertyid, proposalid } = req.body;

    if (!serviceid || !customerid || !propertyid || !proposalid) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Delete the service from the serviceModel
        await serviceModel.deleteOne({ uniqueid: serviceid });

        // Remove the service ID from the services array in proposalModel
        await proposalModel.updateOne(
            { uniqueid: proposalid },
            { $pull: { service: serviceid } }
        );

        // Remove the service ID from the services array in customerModel's property
        await customerModel.updateOne(
            { uniqueid: customerid, 'property.uniqueid': propertyid },
            { $pull: { 'property.$.services': serviceid } }
        );

        return res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

route.delete('/:id', async (req, res) => {
    const serviceid = req.params.id;

    try {
        // Use $pull to remove the customService that matches the uniqueid
        const result = await adminModel.updateOne(
            { username: 'admin' }, // Filter to find the admin document
            { $pull: { customServices: { uniqueid: serviceid } } } // Remove service by uniqueid
        );

        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Service deleted successfully.', success: true });
        } else {
            res.status(404).send({ message: 'Service not found or already deleted.' });
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).send({ message: 'Internal server error.' });
    }
});




module.exports = route;