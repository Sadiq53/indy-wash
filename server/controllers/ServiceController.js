const route = require('express').Router()
const adminModel = require('../model/adminSchema')
const customerModel = require('../model/customerSchema')
const serviceModel = require('../model/serviceSchema')
const proposalModel = require('../model/proposalSchema')
require('dotenv').config();
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const multerS3 = require('multer-s3');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// AWS SDK Configuration
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const deleteImageFromS3 = async (imageKey) => {
    try {
        if (!imageKey) {
            console.error("Image key is missing");
            return;
        }

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey,
        };

        // console.log(`Attempting to delete image: ${imageKey}`);
        const command = new DeleteObjectCommand(deleteParams);
        const result = await s3Client.send(command);

        console.log(`Image ${imageKey} successfully deleted from S3`, result);
    } catch (error) {
        console.error(`Error deleting image ${imageKey} from S3:`, error);
        throw new Error(`Failed to delete image ${imageKey} from S3`);
    }
};



// Multer S3 storage configuration
const storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        const newFilename = `service/${uniqueSuffix}${extension}`;
        cb(null, newFilename); // S3 key (path within the bucket)
    },
});

// Multer instance with limits and file type filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});



route.get('/', async(req, res) => {
    const serviceData = await serviceModel.find({})
    const proposalData = await proposalModel.find({})
    // console.log(serviceData)
    res.status(200).send({success: true, service: serviceData, proposal: proposalData})
})

// route.post('/', upload.any(), async (req, res) => {
//     const rawData = req.body;

//     // Create serviceClone object
//     const serviceClone = {
//         uniqueid: rawData?.serviceUniqueid,
//         createDate: rawData?.createDate,
//         name: rawData?.serviceItem,
//         type: rawData?.type,
//         description: rawData?.description,
//         quantity: rawData?.quantity,
//         sqft: rawData?.sqft,
//         frequency: rawData?.frequency,
//     };

//     // Create proposalClone object
//     const proposalClone = {
//         uniqueid: rawData?.uniqueid,
//         createDate: rawData?.createDate,
//         customer: rawData?.customer,
//         property: rawData?.property,
//         service: [rawData?.serviceUniqueid],
//     };

//     try {
//         // Create proposal in the database
//         await proposalModel.create(proposalClone);

//         // Create service in the database
//         await serviceModel.create(serviceClone);

//         // Find customer by uniqueid
//         const customer = await customerModel.findOne({ uniqueid: rawData?.customer });

//         if (!customer) {
//             return res.status(404).send({ message: 'Customer not found' });
//         }

//         // Find the property inside the customer object
//         const property = customer.property.find(prop => prop.uniqueid === rawData?.property);

//         if (property) {
//             // Push the serviceUniqueid and proposalClone.uniqueid into the respective arrays
//             property.services.push(rawData?.serviceUniqueid);
//             property.proposal.push(rawData?.uniqueid);
//         } else {
//             return res.status(404).send({ message: 'Property not found' });
//         }

//         // Save the updated customer object
//         await customer.save();

//         res.status(200).send({ message: 'Service and Proposal added successfully', success: true, service: serviceClone, proposal: proposalClone });
//     } catch (error) {
//         console.error('Error in adding service and proposal:', error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// });

route.post('/', upload.any(), async (req, res) => {
    // console.log(req.body)
    const rawData = req.body;

    try {
        // Process uploaded files (images in additionalInfo)
        const images = req.files.map(file => ({
            uniqueid: uuidv4(),
            s3Url: file.location, // Public URL of the file
            s3Key: file.key, // S3 Key of the file
        }));


        // Create serviceClone object
        const serviceClone = {
            uniqueid: rawData?.serviceUniqueid,
            createDate: rawData?.createDate,
            name: rawData?.serviceItem,
            type: rawData?.type,
            description: rawData?.description,
            quantity: rawData?.quantity,
            sqft: rawData?.sqft,
            frequency: JSON.parse(rawData?.frequency),
            images: images, // Attach the uploaded images
        };

        // Create proposalClone object
        const proposalClone = {
            uniqueid: rawData?.uniqueid,
            createDate: rawData?.createDate,
            customer: rawData?.customer,
            property: rawData?.property,
            service: [rawData?.serviceUniqueid],
        };

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

        res.status(200).send({
            message: 'Service and Proposal added successfully',
            success: true,
            service: serviceClone,
            proposal: proposalClone,
        });
    } catch (error) {
        console.error('Error in adding service and proposal:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

route.post('/extra', upload.any(), async (req, res) => {
    const rawData = req.body;
    const { customerid, proposalid, propertyid, uniqueid } = rawData;

    // Process uploaded files (images in additionalInfo)
    const images = req.files.map(file => ({
        uniqueid: uuidv4(),
        s3Url: file.location, // Public URL of the file
        s3Key: file.key, // S3 Key of the file
    }));

    // console.log(images)
    
    // Construct serviceClone object
    const serviceClone = {
        uniqueid,
        createDate: rawData?.createDate,
        name: rawData?.name,
        type: rawData?.type,
        description: rawData?.description,
        quantity: rawData?.quantity,
        sqft: rawData?.sqft,
        frequency: JSON.parse(rawData?.frequency),
        activePlan: rawData?.activePlan,
        images
    };

    try {
        await serviceModel.create(serviceClone);

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
    await adminModel.updateOne({username: 'admin'},{$push: {customServices: customServices}})
    res.status(200).send({ success: true, result: customServices })
})

route.put('/custom', async (req, res) => {
    const customService = req.body;
    const { uniqueid } = customService;

    try {
        // Find and update the specific customService entry by uniqueid
        const result = await adminModel.updateOne(
            { username: 'admin', 'customServices.uniqueid': uniqueid }, // Match admin and the customService with uniqueid
            { $set: { 'customServices.$': customService } } // Update the matched customService
        );

        res.status(200).send({ success: true, result: customService });
    } catch (error) {
        console.error('Error updating custom service:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

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
    const { status, proposalid, date } = req.body;

    // Validate input
    // if (typeof status !== "boolean" || !proposalid || !date) {
    //     return res.status(400).send({ message: 'Invalid input data', success: false });
    // }
    
    // console.log(getStatus)

    try {
        // Update the proposal status in the database
        const result = await proposalModel.updateOne(
            { uniqueid: proposalid },
            { $set: { 'status.type': status, 'status.date': date } }
        );

        // Check if any document was updated
        if (result.modifiedCount === 0) { // Use modifiedCount instead of nModified
            return res.status(404).send({ message: 'Proposal not found or status is already set', success: false });
        }

        // Send success response
        res.status(200).send({ message: 'Proposal status updated successfully', success: true });
    } catch (error) {
        // Catch any errors and send a 500 response
        console.error("Error updating proposal status:", error.message);
        res.status(500).send({ message: 'Error updating proposal status', success: false });
    }
});

route.post('/delete', async (req, res) => {
    const { serviceid, customerid, propertyid, proposalid } = req.body;

    if (!serviceid || !customerid || !propertyid || !proposalid) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {

        const service = await serviceModel.findOne({ uniqueid: serviceid });

        if(service?.images?.length >= 1) {
            const {images} = service;
            const urls = images?.map(value => value.s3Key)
            for (const url of urls) {
                await deleteImageFromS3(url);  // Ensure you pass the URL to the delete function
            }
        }

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

route.post('/proposal/delete', async (req, res) => {
    const { serviceid, customerid, propertyid, proposalid } = req.body;

    if (!Array.isArray(serviceid) || serviceid.length === 0 || !customerid || !propertyid || !proposalid) {
        return res.status(400).json({ success: false, message: 'Missing required fields or invalid input' });
    }

    try {

        const services = await serviceModel.find({ uniqueid: { $in: serviceid } });

        const imageKeys = services.flatMap((service) => {
            return Array.isArray(service.images)
                ? service.images.map((img) => img.s3Key).filter(Boolean) // Ensure valid keys
                : [];
        });

        for (const key of imageKeys) {
            await deleteImageFromS3(key);
        }

        await proposalModel.deleteOne({ uniqueid: proposalid });

        await serviceModel.deleteMany({ uniqueid: { $in: serviceid } });

        const customerUpdateResult = await customerModel.updateOne(
            {
                uniqueid: customerid,
                'property.uniqueid': propertyid, // Find the specific property in the customer
            },
            {
                $pull: {
                    'property.$.proposal': proposalid, // Remove the proposalid from the proposals array
                    'property.$.services': { $in: serviceid } // Remove all service IDs in the serviceid array
                }
            }
        );

        // Check if the customer and property were found and updated
        if (customerUpdateResult.matchedCount === 0) {
            return res.status(404).send({ success: false, message: 'Customer or property not found' });
        }

        return res.status(200).send({ success: true, message: 'Proposal and related services deleted successfully' });
    } catch (error) {
        console.error('Error deleting proposal and services:', error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
});


module.exports = route;