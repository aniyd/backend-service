var respUtil = require("../utility/response");
var { validationResult } = require("express-validator");
var patchJSON = require("fast-json-patch");
var jwt = require("../utility/jwt");

module.exports = {
  patch: (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return respUtil.makeResponse(res, false, 403, {
        error: errors.array(),
      });
    }

    if(typeof req.body.document != "object") {
      return respUtil.makeResponse(res, false, 403, {
        error: "document must be JSON object",
      });
    }

    if(typeof req.body.operation != "object") {
      return respUtil.makeResponse(res, false, 403, {
        error: "operation must be JSON object",
      });
    }

    jwt
      .verify(req.body.token)
      .then((decoded) => {
        respUtil.makeResponse(res, true, 200, {
          token: req.body.token,
          newDocument: patchJSON.applyOperation(
            req.body.document,
            req.body.operation
          ).newDocument,
        });
      })
      .catch((err) => {
        respUtil.makeResponse(res, false, 403, {
          error: err,
        });
      });
  },
};
