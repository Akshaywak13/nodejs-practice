const StudentModel = require("../schema/student.schema");

class StudentService {
  async getStudentData() {
    try {
      const query = {
        deleted: { $ne: true }, // Exclude documents marked as deleted
      };
      const stud = await StudentModel.find(query);
      const totalItemsCount = await StudentModel.countDocuments(query);
      if (!stud) {
        throw new Error("Student Data not found");
      }
      return { stud, totalItemsCount };
    } catch (error) {
      console.error("Error retrieving student data", error.message);
      throw error;
    }
  }

  async createStudentData(data) {
    try {
      const stud = new StudentModel(data);

      const create = await stud.save();
      if (!stud) {
        throw new Error("Student Data not found");
      }
      return { create };
    } catch (error) {
      console.error("Error retrieving student data", error.message);
      throw error;
    }
  }

  async softDeleted(_id) {
    try {
      const result = await StudentModel.findByIdAndUpdate(
        _id,
        { deleted: true },
        { new: true }
      );
      if (!result) {
        throw new Error("Student Data not found");
      }
      return {
        daat: {
          status: "Data marked as deleted successfully",
          item: result,
        },
      };
    } catch (error) {
      console.error("Error in soft deleted", error);
      throw new Error("Error making data as deleted:" + error.message);
    }
  }

  async StudentUpdate(pData, bData) {
    try {
      const update = await StudentModel.findByIdAndUpdate(pData, bData, {
        new: true,
      });
      return update;
    } catch (error) {
      console.log("Error in the updateStudent data", error);
    }
  }
}

module.exports = new StudentService();
