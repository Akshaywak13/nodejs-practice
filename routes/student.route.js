const express = require('express');
const router = express.Router();
const StudentService = require('../service/student.service');


router.post('/create',async(req,res)=>{
    const data = req.body;
    console.log("Received data:", data);
    try {
        const result = await StudentService.createStudentData(data);
        if(!result){
            return res.status(404).send({message:"Student data not found"})
        }
        res.status(200).send({message:"Student Data create Successfully", 
            data:result
        });
    } catch (error) {
        res.status(500).send({message:"Internal server Error",error:error.message});
        throw error;
    }
});
router.get('/studentData',async (req, res)=>{
    
    try {
    const {stud,totalItemsCount} = await StudentService.getStudentData(req.body);
    
    res.status(200).send(
        {
            message:"Student data found successfully",
            data: stud,
            totalItemsCount:totalItemsCount
        }
    ) 
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
});

router.delete('/:id',async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await StudentService.softDeleted(id);
        return res.json(result);
    } catch (error) {
        console.error("Error in soft delete ",error.message);
        return res.status(500).send({message:"Internal server error"+error.message});
    }
});

router.put('/update/:id', async (req, res)=>{
    const pData = req.params.id;
    const bData = req.body;
    try {
        const updateData = await StudentService.StudentUpdate(pData, bData);
        if(!updateData){
            return res.status(404).send({message: "Account data not found"});
        }
        res.status(200).send({message: "Account updated successfully",updateData});
    } catch (error) {
        res.send("Internal Server Error",+error.message);
    }
});


module.exports = router;