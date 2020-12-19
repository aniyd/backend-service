var app = require("../app");
var assert = require("assert");
var http = require("http");
var req_params = {};

//GROUP-1 for login flow
describe("login", function () {
  describe("authenticate", function () {
    it("should return error regarding emtpy body", function () {
      rest("/login", {}, (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error.length, 2);
      });
    });
    it("should return error regarding emtpy password", function () {
      rest("/login", { userid: "testuserid" }, (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error[0].msg, "password Is Required!");
      });
    });
    it("should return error regarding emtpy userid", function () {
      rest("/login", { password: "testpassword" }, (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error[0].msg, "userid Is Required!");
      });
    });
    it("should return token after successful authentication", function () {
      rest(
        "/login",
        { userid: "testuserid", password: "testpassword" },
        (resp) => {
          resp = JSON.parse(resp);
          req_params.token = resp.Result.token;
          assert.equal(typeof resp.Result.token, "string");
        }
      );
    });
  });
});

//GROUP-2 for patch flow
describe("jsonPatch", function () {
  it("should return error regarding emtpy body", function () {
    rest("/patch", {}, (resp) => {
      resp = JSON.parse(resp);
      assert.equal(resp.Result.error.length, 3);
    });
  });
  it("should return error regarding emtpy token & operation", function () {
    rest(
      "/patch",
      {
        document: { firstName: "Albert", contactDetails: { phoneNumbers: [] } },
      },
      (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error.length, 2);
        assert.equal(resp.Result.error[0].msg, "token Is Required!");
        assert.equal(resp.Result.error[1].msg, "operation Is Required!");
      }
    );
  });
  it("should return error regarding emtpy document & operation", function () {
    rest(
      "/patch",
      {
        token: "jhadshjsdjn",
      },
      (resp) => {
        resp = JSON.parse(resp);

        assert.equal(resp.Result.error.length, 2);
        assert.equal(resp.Result.error[0].msg, "document Is Required!");
        assert.equal(resp.Result.error[1].msg, "operation Is Required!");
      }
    );
  });
  it("should return error regarding emtpy token & document", function () {
    rest(
      "/patch",
      {
        operation: { op: "replace", path: "/firstName", value: "Joachim" },
      },
      (resp) => {
        resp = JSON.parse(resp);

        assert.equal(resp.Result.error.length, 2);
        assert.equal(resp.Result.error[0].msg, "token Is Required!");
        assert.equal(resp.Result.error[1].msg, "document Is Required!");
      }
    );
  });
  it("should return error regarding invalid token", function () {
    rest(
      "/patch",
      {
        token: "jhadshjsdjn",
        document: { firstName: "Albert", contactDetails: { phoneNumbers: [] } },
        operation: { op: "replace", path: "/firstName", value: "Joachim" },
      },
      (resp) => {
        resp = JSON.parse(resp);

        assert.equal(resp.Result.error.name, "JsonWebTokenError");
      }
    );
  });
  it("should return patched json", function () {
    rest(
      "/patch",
      {
        token: req_params.token,
        document: { firstName: "Albert", contactDetails: { phoneNumbers: [] } },
        operation: { op: "replace", path: "/firstName", value: "Joachim" },
      },
      (resp) => {
        resp = JSON.parse(resp);

        assert.equal(typeof resp.Result.token, "string");
      }
    );
  });
});

describe("generateThumbnail", function () {
  it("should return error regarding emtpy body", function () {
    rest("/generateThumbnail", {}, (resp) => {
      resp = JSON.parse(resp);
      assert.equal(resp.Result.error.length, 3);
    });
  });
  it("should return error regarding emtpy imgUrl", function () {
    rest(
      "/generateThumbnail",
      {
        token: "jskdhbasfnm"
      },
      (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error.length, 2);
        assert.equal(resp.Result.error[0].msg, "imgUrl Is Required!");
       
      }
    );
  });
  it("should return error regarding invaild url format", function () {
    rest(
      "/generateThumbnail",
      {
        token: "jskdhbasfnm",
        imgUrl: "smdbjmdsfn mdfmndf"
      },
      (resp) => {
        resp = JSON.parse(resp);
        console.log(resp.Result.error[0].msg);
        assert.equal(resp.Result.error.length, 1);
        assert.equal(resp.Result.error[0].msg, "imgUrl Must Be URL!");
       
      }
    );
  });
  it("should return error regarding invaild token", function () {
    rest(
      "/generateThumbnail",
      {
        token: "jskdhbasfnm",
        imgUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
      },
      (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.error.name, "JsonWebTokenError");
       
      }
    );
  });
  it("should return valid thumbnail in base64 format", function () {
    rest(
      "/generateThumbnail",
      {
        token: req_params.token,
        imgUrl: "https://i.stack.imgur.com/dihnM.png?s=32"
      },
      (resp) => {
        resp = JSON.parse(resp);
        assert.equal(resp.Result.thumbnailBase64, 'string');
       
      }
    );
  });
});

function rest(path, params, cb) {
  params = JSON.stringify(params);

  const options = {
    hostname: "127.0.0.1",
    port: 3000,
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": params.length,
    },
  };

  var req = http.request(options, (res) => {
    var data = "";
    res.on("data", (d) => {
      data += d;
    });

    res.on("end", () => {
      cb(data);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(params);
  req.end();
}
