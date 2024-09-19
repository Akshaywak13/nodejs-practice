const ACModel = require('../schema/account.schema');

class ACService {
     async createAccount(data) {
        try {
            const account = new ACModel(data);
            const result = await account.save();
            return result;
        } catch (error) {
            console.error("Error in createAccount:", error);
            throw error;
        }
    }

    async getAccount(id){
        try {
            const trimmedId = id.trim(); 
            const accounts = await ACModel.findById(trimmedId);
            return accounts;
        } catch (error) {
            console.log("Error in geting the users",error);
        }
    }

    async getAllAccounts(page = 1, limit = 10) {
      try {
        const skip = (page -1) * limit;
        const accounts = await ACModel.find().skip(skip).limit(limit);
        const totalAccount = await ACModel.countDocuments();
        return { accounts, totalAccount};
      } catch (error) {
        console.log("Error in getAllAccounts",error);
        throw error;
      }
    }

    async updateAccount (id , data){
        try {
            const account = await ACModel.findByIdAndUpdate(id, data, { new: true });
            return account;
        } catch (error) {
            console.log("Error in the updateAccount method", error);
        }
    }

    // async deleteAccount(id) {
    //     try {
    //         const account = await ACModel.findByIdAndDelete(id);
    //         return account;
    //     } catch (error) {
    //         console.log("Error in the deleteAccount method", error);
    //     }
    // }
    async deleteAccount(_id) {
        let application = await ACModel.findOneAndDelete({ _id })
        return {
            data: {
                item: application
            }
        }
    }

    async allBalance (){
        try {
            const allBalance = await ACModel.find({});
            if(allBalance.length === 0){
                throw new Error("No accounts found");
            }

            const totalBalance = allBalance.reduce((sum, account)=> sum + Number(account.opningBalance), 0);
            const opningBalanceCount = allBalance.length;
            return {
                totalBalance,
                opningBalanceCount
            }
        } catch (error) {
            console.error("Error retrieving balancing",error.message);
            throw error;
        }
    }

    
}

module.exports = new ACService();