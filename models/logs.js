require("colors");

const Log = require("./log");

class Logs {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const log = this._list[key];
      list.push(log);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  loadLogsFromArray(logs = []) {
    logs.forEach((log) => {
      this._list[log.id] = log;
    });
  }

  createLog(resume = "") {
    const log = new Log(resume);
    this._list[log.id] = log;
  }

  deleteLog(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  updateLog(id, success) {
    if (this._list[id]) {
      this._list[id].status = success ? "Success" : "Faile";
    }
  }

  listComplete() {
    this.listArr.forEach((log, index) => {
      const i = (index + 1 + ".").green;
      const { resume, timestamp, status } = log;
      const date = new Date(timestamp);

      console.log(`${i} ${resume} :: ${status} :: ${date.toString()}`);
    });
  }
}

module.exports = Logs;
