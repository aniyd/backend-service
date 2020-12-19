var respUtil = require("../utility/response");
var { validationResult } = require("express-validator");
var jwt = require("../utility/jwt");

module.exports = {
  authenticate: (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return respUtil.makeResponse(res, false, 403, {
        error: errors.array(),
      });
    }

    let userid = req.body.userid;
    let password = req.body.password;

    jwt
      .sign({ userid: userid, password: password })
      .then((token) => {
        respUtil.makeResponse(res, true, 200, {
          token: token,
        });
      })
      .catch((err) => {
        respUtil.makeResponse(res, false, 403, {
          error: err,
        });
      });
  },
};
