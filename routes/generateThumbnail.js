var express = require("express");
var thumbnailController = require("../controller/thumbnailController");
var validator = require('../utility/validator');
var respUtil = require("../utility/response");

var router = express.Router();


router.post("/", validator.thumbnailValidator, thumbnailController.generateThumbnail);

module.exports = router;
