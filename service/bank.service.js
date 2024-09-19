const bankModel = require("../schema/bank.schema");

async function generateUniqueId() {
  const lastAc = await bankModel.findOne().sort({ accountNumber: -1 });
  return lastAc ? lastAc.accountNumber + 1 : 10001;
}

class BankService {
  async createBankAc(data) {
    try {
      const accountNumber = await generateUniqueId();
      const createdata = new bankModel({
        ...data,                           // *********** ( ...  use of dotes ) this data are sepretally created 
        accountNumber,                    //  ******   this data sepretally
      });
      console.log("Final Bank Account Data:", createdata);
      const result = await createdata.save();
      return result;
    } catch (error) {
      console.error("Error in creating BankAc", error.message);
      throw error;
    }
  }

  async updateAddress(accountNumber, city, state) {
    try {
      const updatedAccount = await bankModel.findOneAndUpdate(
        { accountNumber },
        // {
        //   $set: 
          {
            "address.city": city,
            "address.state": state,
            UpdatedDate: Date.now(),
          //},
        },
        { new: true }
      );
      return updatedAccount;
    } catch (error) {
      console.error("Error updating address:", error.message);
      throw error;
    }
  }

  async findAccount(name, postalCode, country) {
    try {
      let query = {}; //// ******** qurey Filters **********
      if (name) {
        query.accountHolderName = name;
      }
      if (postalCode) {
        query["address.postalCode"] = postalCode;
      }
      if (country) {
        query["address.country"] = country;
      }
      const findAc = await bankModel.find(query);
      if (!findAc) {
        throw new Error("Bank account not found");
      }
      return findAc;
    } catch (error) {
      console.error("Error Account Finding", error.message);
      throw error;
    }
  }

  async updateAccountType() {
    try {
      // Find the all AC types are 'Savings'
      const usersWithSavings = await bankModel.find({ accountType: "Savings" });

      if (usersWithSavings.length === 0) {
        throw new Error("No users found with 'Savings' account type");
      }

      // Update the account type to 'Bussiness'
      const updateResult = await bankModel.updateMany(
        { accountType: "Savings" },
        { $set: 
          { accountType: "Business" }
       }
      );
      return {
        message: `Updated ${updateResult.nModified} accounts from 'Savings' to 'Bussiness'`,
        updateResult,usersWithSavings
      };
    } catch (error) {
      console.error("Error updating account type", error.message);
      throw error;
    }
  }

  
  async allAccountBalance (){
    try {
        const allAccounts = await bankModel.find({});

        if(allAccounts.length === 0){
            throw new Error("No accounts found");
        }

        // Calculate the total balance and count the number of accounts
        const totalBalance = allAccounts.reduce((sum, account)=> sum + Number(account.balance), 0);
        const accountCount = allAccounts.length;
        return {
            totalBalance,
            accountCount
        }
    } catch (error) {
        console.error("Error retrieving accounts",error.message);
        throw error;
    }
  }


   async searchAccount(id, accountHolderName){
    try {
        let query = {}
        if(id){
            query.id= id;
        }

        if(accountHolderName){
            query.accountHolderName = { $regex: accountHolderName, };
    }
        const result = await bankModel.find(query);
        if(result.length === 0){
            throw new Error("No matching accounts found");
        }
        return result;
    } catch (error) {
        console.error("Error Searching accounts",error.message)
    }
   }

   async countAccountsByName(name){
    try {
        const counts = await bankModel.countDocuments({accountHolderName: name});
        return counts;
    } catch (error) {
        console.error("Error counting accounts",error.message);
        throw error;
    }
   }


}


module.exports = new BankService();
