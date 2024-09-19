const express = require("express");
const cors = require("cors");
require("./db/db.conection");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const practice = require("./routes/practice.route");
app.use("/practice", practice);

const account= require("./routes/account.route");
app.use("/bankaccount",account);

const bookRoutes = require('./routes/book.route');
app.use('/book', bookRoutes);

const calculate = require("./routes/calculate.route");
app.use('/calculate',calculate);

const bankaccount = require('./routes/bank.route');
app.use('/bank',bankaccount);

const student = require("./routes/student.route");
app.use('/student',student);

const upload = require("./routes/upload.router");
app.use('/up',upload);

const businessDe = require('./routes/BusinessDetails.route');
app.use('/businessDetails',businessDe);

const businessType = require('./routes/BusinessType.route');
app.use('/businesstype', businessType);

const bulkUp = require('./routes/bulk.route');
app.use('/bulkUpload',bulkUp);

const businessCategory = require('./routes/businessCategory.route');
app.use('/businessCategory',businessCategory);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
