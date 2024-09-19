const businessDetailsModel = require("../schema/businessDetails.schema");

class BusinessDetailsService {
  async createBusd(data) {
    try {
      // Ensure required fields are present
      if (!data.businessTypeId || !data.BusinessCategoryId) {
        throw new Error("businessTypeId and BusinessCategoryId are required");
      }
  
      const result = await businessDetailsModel.create(data);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error in BusinessDetails:", error.message);
      return { success: false, message: error.message };
    }
  }
  

  async getById(id) {
    try {
      const find = await businessDetailsModel.findById(id);
      return find;
    } catch (error) {
      console.error("Error in geting the users", error);
      throw error;
    }
  }

  async getAll(BusinessCategoryId,businessTypeId) {
    try {
      if (!businessTypeId && !BusinessCategoryId) {
        throw new Error('businessTypeId and BussinessCategoryId is required');
      }
      const items = await businessDetailsModel.find({
        BusinessCategoryId:BusinessCategoryId,
        businessTypeId:businessTypeId
      });
      const totalItemsCount = await businessDetailsModel.countDocuments({
        BusinessCategoryId:BusinessCategoryId,
        businessTypeId:businessTypeId
      });
      return { items, totalItemsCount };
    } catch (error) {
      console.error("Error in BusinessDetails:", error.message);
      throw error;
    }
  }

  async filterByAccountType(accountType, page, limit) {
    try {
      const skip = (page - 1) * limit;

      const items = await businessDetailsModel
        .find({
          "BankDetails.accountType": accountType,
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      const totalItemsCount = await businessDetailsModel.countDocuments({
        "BankDetails.accountType": accountType,
      });
      return { items, totalItemsCount };
    } catch (error) {
      console.error("Error in filtering by account type:", error.message);
      throw error;
    }
  }

  async updateData(id, data) {
    try {
      const result = await businessDetailsModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.error("Error in updating data", error.message);
    }
  }

  async  searchBusinessDetails({ firstName, lastName, mobileNum, email, gender, businessName, gstNumber, pincode, page = 1, pageSize = 10, search }) {
    try {
        let query = {
            deleted: { $nin: [true] }  // Assuming you have a deleted flag for soft deletes
        };

        // Apply filters based on query parameters
        if (firstName) {
            query.firstName = { $regex: firstName, $options: 'i' };
        }
        if (lastName) {
            query.lastName = { $regex: lastName, $options: 'i' };
        }
        if (mobileNum) {
            query.mobileNum = parseInt(mobileNum);
        }
        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }
        if (gender) {
            query.gender = gender;
        }
        if (businessName) {
            query.businessName = { $regex: businessName, $options: 'i' };
        }
        if (gstNumber) {
            query['registrationdetails.gstNumber'] = { $regex: gstNumber, $options: 'i' };
        }
        if (pincode) {
            query['businessDetails.pincode'] = parseInt(pincode);
        }
        if (search) {
            const numericSearch = parseInt(search);
            if (!isNaN(numericSearch)) {
                query.$or = [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { mobileNum: numericSearch },
                    { email: { $regex: search, $options: 'i' } },
                    { businessName: { $regex: search, $options: 'i' } },
                    { 'registrationdetails.gstNumber': { $regex: search, $options: 'i' } },
                    { 'businessDetails.pincode': numericSearch }
                ];
            } else {
                query.$or = [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { businessName: { $regex: search, $options: 'i' } },
                    { 'registrationdetails.gstNumber': { $regex: search, $options: 'i' } }
                ];
            }
        }

        // Pagination
        const totalItems = await businessDetailsModel.countDocuments(query);
        const totalPages = Math.ceil(totalItems / pageSize);

        const businessDetails = await businessDetailsModel.find(query)
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize))
            .sort({ createdAt: -1 }) // Adjust sorting as needed
            .exec();

        return {
            items: businessDetails,
            totalItems: totalItems,
            currentPage: page,
            totalPages: totalPages
        };
    } catch (error) {
        console.error("Error fetching business details", error);
        throw new Error("Error fetching business details: " + error.message);
    }
}

  async DeleteById (_id){
    let deletedata = await businessDetailsModel.findByIdAndDelete(_id);
    return {
      data:{
        status:"data deleted successfull",
        item: deletedata
      }
    }
  }


}

module.exports = new BusinessDetailsService();
