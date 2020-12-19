var { check } = require("express-validator");

module.exports = {
  loginDataValidate: [
    check("userid", "userid Is Required!").not().isEmpty(),
    check("password", "password Is Required!").not().isEmpty(),
  ],
  patchValidator: [
    check("token", "token Is Required!").not().isEmpty(),
    check("document", "document Is Required!").not().isEmpty(),
    check("operation", "operation Is Required!").not().isEmpty(),
  ],
  thumbnailValidator: [
    check("token", "token Is Required!").not().isEmpty(),
    check("imgUrl", "imgUrl Is Required!").not().isEmpty(),
    check("imgUrl", "imgUrl Must Be URL!").isURL(),
  ],
};
