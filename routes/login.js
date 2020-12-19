var express = require("express");
var loginController = require("../controller/loginController");
var validator =require('../utility/validator');

var router = express.Router();

/* API to validate the user*/
router.post("/", validator.loginDataValidate, loginController.authenticate);

module.exports = router;
