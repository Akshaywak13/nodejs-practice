const express = require("express");
const router = express.Router();
const multer = require("multer");
const BulkUploadService = require("../service/bulk.service");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route to handle file upload and processing
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const result = await BulkUploadService.processExcelFile(filePath);

    if (!result.success) {
      return res.status(400).send({ message: "Failed to process data." });
    }

    return res.status(200).send({
      message: "Data uploaded and processed successfully",
      data: result.data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

// Route to archive and delete all data
router.delete("/deleteAll", async (req, res) => {
  try {
    const result = await BulkUploadService.archiveAndDeleteAllData();
    console.log(result);
    if (!result.success) {
      return res.status(400).send({ message: result.message });
    }

    return res.status(200).send({
      message: result.message,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Route to get all archived data and insert it back into BulkUpSchema
router.get("/getAllAndCreate", async (req, res) => {
  try {
    const result = await BulkUploadService.getAllDeletedData();
    if (!result.success) {
      return res
        .status(404)
        .send({ message: "Data not found", data: result.data });
    }

    return res
      .status(200)
      .send({ message: "Data retrieved and inserted back", data: result.data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
