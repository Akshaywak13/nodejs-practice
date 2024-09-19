const express = require('express')
const router = express.Router();
const service = require('../service/businessCategory.service');


router.post('/create', async (req, res)=>{
    
    try {
        const data = req.body;
        const result = await service.createBusiness(data);
        res.status(201).json({
            message: "Business category created successfully",
            data: result
        });
    } catch (error) {
        res.send("Internal Server Error"+error.message);
        
    }
});

router.get('/getAll/businessTypeId/:businessTypeId', async (req, res) => {
    try {
      const { businessTypeId } = req.params; // Extract businessTypeId from query params
      const result = await service.getAllBusinessCategories(businessTypeId);
      res.status(200).json({
        message: "Business categories retrieved successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      });
    }
  });
  

router.get('/getById/:BusinessCategoryId', async (req, res) => {
    const businessCategoryId = req.params.BusinessCategoryId;
    try {
        const result = await service.getAllDataById(businessCategoryId);
        res.status(200).json({
            message: "Business category retrieved successfully",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            message: "Business category not found",
            error: error.message
        });
    }
});
router.get('/getAllNames', async (req, res) => {
    try {
      const result = await service.getAllBusinessCategoriesName();
      res.status(200).json({
        message: "Business category names retrieved successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      });
    }
  });


module.exports = router;