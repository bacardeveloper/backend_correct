const {
  createUser,
  verifyEmailExist,
} = require("../../features/bdd_functions_user");
const { print } = require("print_console_log");

exports.create_userController = async (req, res, next) => {
  print(req.body);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password_in: req.body.password,
    admin: true,
  };

  let emailExist = await verifyEmailExist(user.email);
  print(emailExist);
  if (emailExist) {
    return res.status(401).json({ message: "Email existant dans la BDD" });
  } else {

    let reponse = await createUser(
      user.name,
      user.email,
      user.password_in,
      user.admin
    );
    let reponse_bool = Boolean(reponse);

    if (reponse_bool)
      return res.status(201).json({ message: "signup user ok" });
    if (!reponse_bool)
      return res.status(401).json({ message: "signup user not ok" });

  }
};
