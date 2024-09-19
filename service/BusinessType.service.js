const BusinessTypeModel = require("../schema/BusinessType.schema");

class BusinessType {
  async createBusinessType(data, businessTypeId) {
    try {
      const businessType = new BusinessTypeModel({
        businessTypeId: businessTypeId,
        ...data,
      });
      const result = await businessType.save();
      return result;
    } catch (error) {
      console.error("Error in BusinessType:", error.message);
      throw error;
    }
  }

  async getAllBusinessTypes(data) {
    try {
        const items = await BusinessTypeModel.find(data);
        const totalItemsCount = await BusinessTypeModel.countDocuments(data);
        return { items, totalItemsCount };
    } catch (error) {
        console.error("Error in BusinessType:", error.message);
    }
  }
  async getBusinessTypeById(id) {
    try {
      const businessType = await BusinessTypeModel.findOne({ businessTypeId: id });
      return businessType;
    } catch (error) {
      console.error("Error in BusinessType:", error.message);
      throw error;
    }
  }
  
}

module.exports = new BusinessType;
