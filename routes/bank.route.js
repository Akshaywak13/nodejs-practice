const express = require('express');
const router = express.Router();
const BankAccountService = require('../service/bank.service');
const bankService = require('../service/bank.service');


router.post('/create', async (req, res)=> {
    try {
        const data = req.body;
        const newAccount = await BankAccountService.createBankAc(data);
        if (!newAccount) {
            return res.status(404).send({message:"BankAccount data is not found"});
        }
        res.status(200).send({message:"BankAccount created Successfully",newAccount});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
});

router.put('/updateAddress/:accountNumber', async (req,res)=>{
    const { accountNumber} = req.params;
    const { city, state } = req.body;
    
    try {
        const updateAddress = await BankAccountService.updateAddress(accountNumber,city,state);
        if(!updateAddress){
            return res.status(404).send({message:"Address not found "})
        }
        res.status(200).send({message:"Address Updated Successfull",updateAddress});
    } catch (error) {
        console.error("Error updating address:",error);
        res.status(500).send({message:"Internal Server Error ",error:error.message});
    }
});


router.get('/getAc', async (req, res)=>{
    const  {name, postalCode, country} = req.query;
    try {
      
        const getData = await BankAccountService.findAccount(name, postalCode, country);
        
        res.status(200).send({message:"Data Found Successfully",data: getData});
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message});
    }
});

router.post('/updateAccountType', async (req, res)=>{
    try {
        const result = await BankAccountService.updateAccountType();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message:"Internal Server errror", error:error.message});
    }
});

router.get('/allAccountBalance', async (req, res)=>{
    const summary = await bankService.allAccountBalance();
    try {
        res.status(200).send({message:"All Accounts Balance get Successfully",
            totalBalance: summary.totalBalance,
            accountCount: summary.accountCount
        })
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message});
    }
});

router.get('/searchAccount', async (req, res)=>{
    const { id , accountHolderName} = req.query;
    try {
        if(!id && !accountHolderName){
            return res.status(400).send({message:"Please provide an ID or a name for searching"});
        }
        const searchResults = await bankService.searchAccount(id, accountHolderName);
        console.log(searchResults)
        res.status(200).send({message:"Search results retrieved successfully",
            results: searchResults,
        });
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message});
    }
});

router.get('/countAccountsByName', async (req, res)=>{
    const {name} = req.query;
    try {
        if(!name){
            console.log(name);
           return res.status(404).send({message:"Please provide a name for counting"})
        }

        const count = await bankService.countAccountsByName(name);
        console.log(count);
        res.status(200).send({
            message:`Count of accounts with name "${name}" retrieved successfully`,
        count: count,
        });
    } catch (error) {
        res.status(500).send({message:"Internal Server error",error:error.message});
    }
})

module.exports = router;