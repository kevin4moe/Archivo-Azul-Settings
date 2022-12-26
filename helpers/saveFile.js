const fs = require("fs");

const today = new Date();
const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
const filename = today
  .toLocaleDateString(process.env.LOCALE, options)
  .replaceAll("/", "-");

const file = `./logs/${filename}.json`;

const saveFile = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readFile = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  saveFile,
  readFile,
};
