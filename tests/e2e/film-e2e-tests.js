const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const mongoose = require("../../lib/connect");
const connection = require("mongoose").connection;
const connect = require("mongoose").connect;
const dbHelper = require("../db-helper");

chai.use(chaiHttp);

describe.only("film e2e tests", () => {
  const req = chai.request(app);
  before(() => connect);
  beforeEach(() => dbHelper.dropColl("film"));

});
