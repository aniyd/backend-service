var express = require("express");
var patchController = require("../controller/patchController");
var validator = require('../utility/validator');
var respUtil = require("../utility/response");

var router = express.Router();


router.post("/", validator.patchValidator, patchController.patch);

module.exports = router;
