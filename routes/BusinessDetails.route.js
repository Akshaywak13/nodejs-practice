const express = require("express");
const router = express.Router();
const service = require("../service/BusinessDetails.service");

router.post("/create", async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const data = req.body;
    const result = await service.createBusd(data);

    if (!result.success) {
      return res.status(400).send({
        message: result.message,
        duplicates: result.duplicates,
      });
    }

    return res
      .status(200)
      .send({
        message: "Business details created successfully",
        data: result.data,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    return res.send({ message: "getby id ", data: data });
  } catch (error) {
    res.send({ message: "Internal server url", error: error.message });
  }
});

router.get(
  "/getall/BusinessCategoryId/:BusinessCategoryId/businessTypeId/:businessTypeId",
  async (req, res) => {
    try {
      const { BusinessCategoryId, businessTypeId } = req.params;
      const { items, totalItemsCount } = await service.getAll(
        BusinessCategoryId,
        businessTypeId
      );
      return res.send({
        message: "Get all data successfully",
        data: items,
        totalItemsCount: totalItemsCount,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  }
);

router.get("/filterByAccountType", async (req, res) => {
  try {
    const { accountType, page = 1, limit = 10 } = req.query;
    const { items, totalItemsCount } = await service.filterByAccountType(
      accountType
    );
    res.status(200).send({
      message: "Filtered and sorted data",
      data: items,
      totalItemsCount: totalItemsCount,
      currentPage: page,
      totalPages: Math.ceil(totalItemsCount / limit),
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const data = req.body;
  try {
    const result = await service.updateData(ID, data);
    if (!result) {
      return res.status(404).send({ message: "Data not found" });
    }
    res
      .status(200)
      .send({ message: "Data updated successfully", data: result });
  } catch (error) {
    res.send({ message: "Internal sever error", error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNum,
      email,
      gender,
      businessName,
      gstNumber,
      pincode,
      page = 1,
      pageSize = 10,
      search,
    } = req.query;

    const result = await service.searchBusinessDetails({
      firstName,
      lastName,
      mobileNum,
      email,
      gender,
      businessName,
      gstNumber,
      pincode,
      page,
      pageSize,
      search,
    });

    return res.json({
      data: result,
    });
  } catch (error) {
    console.error("Error in search route", error);
    return res.status(500).json({
      message: "Error in search route: " + error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const data = req.params.id;
  const deletedData = await service.DeleteById(data);
  res.send(deletedData);
});

module.exports = router;
