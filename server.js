const express = require("express");
const app = express();
const Fuse = require("fuse.js");
const bcrypt = require("bcrypt");
const buildPage = require("./page_builder");
const buildHome = require("./home_builder");
const { models, requestedModels } = require("./files");
const buildNoPage = require("./no_page_builder");
const {
  buildLoginPage,
  getRotatingAdminUrl,
  buildAdminPage,
} = require("./admin_builder");
const History = require("./dumb_handler");
app.set("view engine", "ejs");

// Fuse.js configuration
let fuse;
setTimeout(() => {
  fuse = new Fuse(Object.keys(models), {
    includeScore: true, // Include the scoring of matches
    isCaseSensitive: false, // Case insensitive
    findAllMatches: true, // Include matches of all lengths
    threshold: 1, // Tolerance level for mismatches
  });
}, 500);

app.get("/", function (req, res) {
  res.send(buildHome());
});

app.get("/:model", function (req, res) {
  const history = models[req.params.model];
  if (!history) res.send(buildNoPage(req.params.model));
  else res.send(buildPage(req.params.model, history.getGraphData(30)));
});

app.get("/:model/:ip", function (req, res) {
  const history = models[req.params.model];
  if (!history) res.send("No Page");
  else {
    history.increment(req.params.ip);
    res.send(JSON.stringify(history.getGraphData(30)));
  }
});

app.get("/request/newpage/:model", function (req, res) {
  requestedModels.add(req.params.model);
});

app.get("/fuzzy/search/:query", function (req, res) {
  res.send(
    fuse
      .search(req.params.query)
      .slice(0, 5)
      .map((result) => result.item)
  );
});

app.get("/admin/login/page", function (req, res) {
  res.send(buildLoginPage());
});

app.get("/get/rotating/:password", function (req, res) {
  const salt =
    "$2b$10$5vUsGyZY2M9FPG8UWXfBmOUlwqz.6J/DvJuZK9VxronkycJfAI9vq".slice(0, 29);
  bcrypt.hash(req.params.password, salt, (err, hash) => {
    if (
      hash === "$2b$10$5vUsGyZY2M9FPG8UWXfBmOUlwqz.6J/DvJuZK9VxronkycJfAI9vq"
    ) {
      res.send(JSON.stringify("/admin/page/" + getRotatingAdminUrl()));
    } else {
      res.send(JSON.stringify("/admin/login/page"));
    }
  });
});

app.get("/admin/page/:rotating", function (req, res) {
  if (req.params.rotating == getRotatingAdminUrl()) {
    res.send(buildAdminPage());
  } else {
    res.send("failed");
  }
});

app.get("/new/model/:model/:rotating", function (req, res) {
  if (req.params.rotating == getRotatingAdminUrl()) {
    models[req.params.model] = new History();
    fuse = new Fuse(Object.keys(models), {
      includeScore: true, // Include the scoring of matches
      isCaseSensitive: false, // Case insensitive
      findAllMatches: true, // Include matches of all lengths
      threshold: 1, // Tolerance level for mismatches
    });
    res.send(buildAdminPage());
  } else {
    res.send("failed");
  }
});

app.get("/remove/model/:model/:rotating", function (req, res) {
  if (req.params.rotating == getRotatingAdminUrl()) {
    delete models[req.params.model];
    res.send(buildAdminPage());
  } else {
    res.send("failed");
  }
});

app.get("/remove/request/:model/:rotating", function (req, res) {
  if (req.params.rotating == getRotatingAdminUrl()) {
    requestedModels.delete(req.params.model);
    res.send(buildAdminPage());
  } else {
    res.send("failed");
  }
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
