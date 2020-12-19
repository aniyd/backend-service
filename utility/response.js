module.exports = {
  makeResponse: function (res, successStatus, statusCode, result) {
    // response
    res.set("Access-Control-Allow-Origin", "*");
    res.statusCode = statusCode;
    res.status(statusCode).send({
      Status: successStatus,
      Result: result,
    });
  },
};
