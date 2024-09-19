const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,res, cb){
            cb(null, "uploads")
        },
        filename: function(req, file, cb){
            cb(null,file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file")
router.post('/upload', upload ,async (req, res)=>{
    res.send("file uploaded");
});

module.exports = router;
