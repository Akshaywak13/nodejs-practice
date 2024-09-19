const fs = require("fs");
const XLSX = require("xlsx");
const BulkUpSchema = require("../schema/bulk.schema");
const ArchivedBulkSchema = require("../schema/allDeletedStore.schema");

class BulkUploadService {
  async processExcelFile(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const bulkData = data.map((item) => ({
        name: item.name,
        email: item.email,
        age: item.age,
      }));

      const result = await BulkUpSchema.insertMany(bulkData);
      fs.unlinkSync(filePath);

      return { success: true, data: result };
    } catch (error) {
      console.error("Error in processing Excel file:", error.message);
      throw new Error("Error in processing Excel file: " + error.message);
    }
  }

  async archiveAndDeleteAllData() {
    try {
      const dataToDelete = await BulkUpSchema.find();

      if (dataToDelete.length === 0) {
        return { success: false, message: "No data to delete" };
      }
      console.log(dataToDelete);
      await ArchivedBulkSchema.insertMany(dataToDelete);

      await BulkUpSchema.deleteMany();

      return {
        success: true,
        message: "Data archived and deleted successfully",
      };
    } catch (error) {
      console.error("Error in archiving and deleting data:", error.message);
      throw new Error("Error in archiving and deleting data: " + error.message);
    }
  }

  async getAllDeletedData() {
    try {
      const data = await ArchivedBulkSchema.find();
      if (data.length === 0) {
        return { success: false, message: "No data to retrieve" };
      }

      const filteredData = data.map((item) => ({
        name: item.name,
        email: item.email,
        age: item.age,
      }));

      await BulkUpSchema.insertMany(filteredData);
      // await ArchivedBulkSchema.deleteMany();
      return { success: true, data: filteredData };
    } catch (error) {
      console.error("Error in getting all deleted data:", error.message);
      throw new Error("Error in getting all deleted data: " + error.message);
    }
  }
}

module.exports = new BulkUploadService();
