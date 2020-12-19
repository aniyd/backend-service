var fs = require("fs");
var respUtil = require("../utility/response");
var { validationResult } = require("express-validator");
var jwt = require("../utility/jwt");

module.exports = {
  generateThumbnail: (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return respUtil.makeResponse(res, false, 403, {
        error: errors.array(),
      });
    }

    jwt
      .verify(req.body.token)
      .then((decoded) => {
        let file = fs.createWriteStream("tempImage");

        require(new URL(req.body.imgUrl).protocol.replace(":", "")).get(
          req.body.imgUrl,
          function (response) {
            response.pipe(file).on("finish", () => {
              let sharp = require("sharp");
              sharp("tempImage")
                .resize(50, 50)
                .toBuffer()
                .then((data) => {
                  fs.unlink("tempImage", (err) => {});
                  respUtil.makeResponse(res, true, 200, {
                    token: req.body.token,
                    thumbnailBase64: data.toString("base64"),
                  });
                })
                .catch((err) => {
                  respUtil.makeResponse(res, false, 403, {
                    error: err,
                  });
                });
            });
          }
        );
      })
      .catch((err) => {
        respUtil.makeResponse(res, false, 403, {
          error: err,
        });
      });
  },
};
