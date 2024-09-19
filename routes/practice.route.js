const express = require("express");
const router = express.Router();
const PrtService = require("../service/practice.service");

router.post("/", async (req, res) => {
  const { groupId, userId, name, email, phoneNumber } = req.body;

  try {
    if (!groupId || !userId || !name || !email || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const data = await PrtService.creatUser(
      groupId,
      userId,
      name,
      email,
      phoneNumber
    );
    res.send({message: "User Created successfully",data});
  } catch (error) {
    console.log("Error handling requqest:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const user = await PrtService.getuser(groupId);
    res.send({message: "User fecthed successfully",user});
  } catch (error) {
    throw error;
  }
});

module.exports = router;
