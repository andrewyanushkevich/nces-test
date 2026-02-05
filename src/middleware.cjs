module.exports = (req, res, next) => {
  const now = new Date().toISOString();

  if (req.method === "POST") {
    req.body.createdAt = now;
    req.body.updatedAt = now;
  } else if ("PATCH" === req.method) {
    req.body.updatedAt = now;
  }

  next();
};
