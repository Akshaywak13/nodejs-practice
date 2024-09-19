const express = require('express');
const router = express.Router();
const service = require('../service/BusinessType.service');

router.post('/create', async (req, res) => {
    try {
        const businessTypeId = +Date.now()
        const data = req.body;
        const result = await service.createBusinessType(data, businessTypeId);
        if (!result) {
            return res.status(404).send({ message: "Business type data not found" });
        }
        res.status(200).send({ message: "Business type created successfully",data: result });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error:error.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const { items, totalItemsCount} = await service.getAllBusinessTypes(req.body);
        return res.send({
            message: "Get all data successfully",
            data: items,
            totalItemsCount: totalItemsCount,
            });
    } catch (error) {
        res.send({ message: "Internal server error", error: error.message });
    }
});

router.get('/businessTypeId/:businessTypeId', async (req, res) => {
    try {
        const result = await service.getBusinessTypeById( req.params.businessTypeId);
        if (!result) {
            return res.status(404).send({ message: "Business type data not found" });
        }
        res.status(200).send({ message: "Get data successfully", data: result });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;