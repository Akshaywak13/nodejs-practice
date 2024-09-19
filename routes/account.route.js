const express = require("express");
const router = express.Router();
const service = require('../service/account.service');


router.post('/', async (req, res)=>{
    try {
        const data = req.body;
        console.log("Received data:", data);
        const result = await service.createAccount(data);
        if(!result){
            return res.status(404).send({message: "Account data is not find"})
        }
        res.status(200).send({message: "Account created successfully",result})
    } catch (error) {
        res.status(500).send({message:"Internal server errror"});
    }
});

router.get('/getbydata/:id', async (req, res) => {
    const accountId = req.params.id;
    try {
        const getData = await service.getAccount(accountId);
        console.log(getData);
        if (!getData) {
            return res.status(404).send({ message: "Account not found" });
        }
        return res.status(200).send({ message: "Data retrieved successfully", getData }); 
    } catch (error) {
        console.log("Internal server error", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.get('/getall', async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const {accounts, totalAccounts} = await  service.getAllAccounts(page, limit);
        if(!accounts || accounts.length === 0){
            return res.status(404).send({message:"No accounts found"});
        }
        res.status(200).send({
            message: "Get All acounts successfully",
            data: accounts,
            pagination: {
                totalAccounts,
                currentPage: page,
                totalPages: Math.ceil(totalAccounts / limit),
                perpage: limit
            }
        });
    } catch (error) {
        res.status(500).send({message:"Internal server error",error});
    }
});

router.put('/update/:id', async (req, res)=>{
    const accountID = req.params.id;
    const data = req.body;
    try {
        const updateData = await service.updateAccount(accountID, data);
        if(!updateData){
            return res.status(404).send({message: "Account data not found"});
        }
        res.status(200).send({message: "Account updated successfully",updateData});
    } catch (error) {
        res.status(500).send({message:" Internala server error",error});
    }
});

router.delete('/delete/:id', async (req, res)=>{
    const accountId = req.params.id;
    const deletedData = await service.deleteAccount(accountId);
    res.send(deletedData);
    // try {
    //     const deletedData = await service.deleteAccount(accountId);
    //     if(!deletedData){
    //         return res.send({message:" No account"});
    //     }
    //     res.status(200).send({message:"Data deleted successfully",deletedData});
    // } catch (error) {
    //     res.status(500).send({message:"Internal server error",error:error.message});
    // }
});

router.get('/totalOpningBalance', async (req, res)=>{
    const total = await service.allBalance()
    try {
        res.status(200).send({
            message:"All Opening balance total are get Successfull",
            totalOpeningBalance: total.totalBalance,
            totalAccounts: total.opningBalanceCount
        })
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message});
    }
})

module.exports = router;