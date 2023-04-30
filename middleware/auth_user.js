const jwt = require("jsonwebtoken");
const { print } = require("print_console_log");

const secret_token_jwt = "976mayotte";

const authUser = (req, res, next) => {
  if (req.params.token) {
    const token = req.params.token;
    try {
      if (!token)
        return res.status(403).json({ erreur: "vous n'etes pas connéctés" });
      const decoded = jwt.verify(token, secret_token_jwt);
      req.user_decoded = decoded;
      next();
    } catch (err) {
      return res.status(400).json({ message: "connectez vous" });
    }
  }

  if (req.body.token) {
    const token = req.body.token;
    try {
      if (!token)
        return res.status(403).json({ erreur: "vous n'etes pas connéctés" });
      const decoded = jwt.verify(token, secret_token_jwt);
      req.user_decoded = decoded;
      next();
    } catch (err) {
      return res.status(400).json({ message: "connectez vous" });
    }
  }
};

module.exports = authUser;
