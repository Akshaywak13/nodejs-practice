const PrtModel = require("../schema/practice.schema");

class PrtService {
  async creatUser(groupId, userId, name, email, phoneNumber) {
    try {
      const userData = await PrtModel({
        groupId: groupId,
        userId: userId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      });
      const user = await userData.save();
      return user;
    } catch (error) {
      console.log("Error creating user:", error.message);
      throw error;
    }
  }

  async getuser(groupId) {
    try {
      const userData = await PrtModel.find({ groupId: groupId }); //Number(groupId)
      return userData
    //   return {
    //     message: "User fecthed successfully",
    //     userData: userData,
    //   };
    } catch (error) {
      console.log("Error getting user:", error.message);
      throw error;
    }
  }
}

module.exports = new PrtService();
