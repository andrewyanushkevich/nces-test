module.exports = (req, res, next) => {
  const now = new Date().toISOString();

  if (req.method === "POST") {
    req.body.createdAt = now;
    req.body.updatedAt = now;
  } else if ("PATCH" === req.method) {
    req.body.updatedAt = now;
  }

  if (req.path === "/tasks" && req.query.q) {
    const term = req.query.q.toLowerCase();
    const db = require("./db.json");

    const results = db.tasks.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.description && item.description.toLowerCase().includes(term))
    );

    return res.json(results);
  }

  next();
};
