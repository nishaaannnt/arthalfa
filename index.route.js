const express = require("express");
const router = express.Router();

// basic api call to check if working
router.get("/health-check",(req,res) => { res.send({message:"ok"})})

router.use("/products", require("./server/routes/product.route"))

module.exports = router;