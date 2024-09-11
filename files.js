const fs = require("fs");
const History = require("./dumb_handler");

const models = {
  "GPT-4o": new History(),
  "GPT-4o mini": new History(),
  "GPT-4": new History(),
  "GPT-4 Turbo": new History(),
};

const requestedModels = new Set();

const modelPath = "/var/data/model_data.json";
const requestedPath = "/var/data/requested_data.json";

fs.readFile(modelPath, "utf8", (err, data) => {
  if (err) {
    updateModels();
  } else {
    const json = JSON.parse(data);
    Object.keys(json).forEach((key) => {
      models[key] = new History(json[key]);
    });
  }
});

fs.readFile(requestedPath, "utf8", (err, data) => {
  if (err) {
    updateModels();
  } else {
    const json = JSON.parse(data);
    console.log(json);
    json.requested.forEach(model => requestedModels.add(model));
  }
});

function updateModels() {
  fs.writeFile(modelPath, JSON.stringify(models), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  const requested = [];
  requestedModels.forEach(model => requested.push(model));

  fs.writeFile(requestedPath, JSON.stringify({requested: requested}), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  Object.values(models).forEach(model => model.checkDate());
}

setInterval(updateModels, 1000 * 60); // every minute

module.exports = { models, requestedModels };
