const express = require('express');
const router = express.Router();

router.post('/calculate-total', async (req, res)=>{
    const { quantity, unitPrice } = req.body;
    if(typeof quantity !== 'number' || typeof unitPrice !== 'number'){
        return res.status(404).json({ error: 'Quantity and Unit Price must be numbers' });
    }
    if(quantity <= 0 || unitPrice <=0){
        return res.status(404).json({error: "Quantity and Unit Price must be greater than 0"});
    }
    const totalPrice = quantity * unitPrice;
    return res.status(200).json({totalPrice});
});

module.exports = router;