const express= require("express");
const verifyRefreshToken = require("../utils/verifyrefreshToken");
const router= express.Router();


router.post('/',verifyRefreshToken);


module.exports = router  

