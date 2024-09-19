const businessCategoryModel = require("../schema/businessCategory.schema");

class BusinessCategoryService {
  async createBusiness(data) {
    try {
      const businessCategoryId = Date.now();
      const newData = {
        ...data,
        BusinessCategoryId: businessCategoryId,
      };
      const result = await businessCategoryModel.create(newData);
      return result;
    } catch (error) {
      console.error("Error in BusinessCategory", +error.message);
      throw error;
    }
  }
  async getAllBusinessCategories(businessTypeId) {
    try {
      // Ensure that businessTypeId is passed in
      if (!businessTypeId) {
        throw new Error('businessTypeId is required');
      }
  
      const result = await businessCategoryModel.find({ businessTypeId: businessTypeId });
      console.log("get data", businessTypeId);
      return result;
    } catch (error) {
      console.error("Error in fetching BusinessCategories: " + error.message);
      throw error;
    }
  }
  

  async getAllDataById(businessCategoryId) {
    try {
      const data = await businessCategoryModel.findOne({
        BusinessCategoryId: businessCategoryId,
      });
      if (!data) {
        throw new Error("Business category not found");
      }
      return data;
    } catch (error) {
      console.error("Error in fetching data by ID:", error.message);
      throw error;
    }
  }

  async getAllBusinessCategoriesName() {
    try {
      const result = await businessCategoryModel.find({}, 'BusinessCategoryName '); // Select only the BusinessCategoryName field and others 
      return result;
    } catch (error) {
      console.error("Error in fetching BusinessCategories: " + error.message);
      throw error;
    }
  }

}

module.exports = new BusinessCategoryService();
