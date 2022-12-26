const { v4: uuidv4 } = require("uuid");

class Log {
  id = "";
  status = "";
  resume = "";
  timestamp = Date.now();

  constructor(resume) {
    this.id = uuidv4();
    this.status = "";
    this.resume = resume;
    this.timestamp = Date.now();
  }
}

module.exports = Log;
