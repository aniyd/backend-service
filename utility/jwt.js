var jwt = require("jsonwebtoken");

module.exports = {
  /*==================== JWT Signing =====================*/
  sign: async (data) => {
    var signOptions = {
      issuer: "Kashware",
      subject: "Kashware-Subject",
      audience: "Kashware-Client",
      expiresIn: process.env.JWT_EXPIRY + "ms"
    };

    return jwt.sign(data, process.env.APP_KEY, signOptions);
  },

  /*==================== JWT Verifying =====================*/
  verify: async (token) => {
    var verifyOptions = {
      issuer: "Kashware",
      subject: "Kashware-Subject",
      audience: "Kashware-Client",
      expiresIn: process.env.JWT_EXPIRY + "ms"
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.APP_KEY, verifyOptions, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
  decode: async token => {
    return await jwt.decode(token);
  }
};
