const { print } = require("print_console_log");
const { connectUser } = require("../../features/bdd_functions_user");
const {
  generateToken,
  passwordCompare,
  verifyEmailExist,
} = require("../../features/bdd_functions_user");

exports.login_userController = async (req, res, next) => {
  if (
    req.body.password.split(" ").join("") !== "" &&
    req.body.email.split(" ").join("") !== ""
  ) {

    let user_login = {
      email: req.body.email,
      password_login: req.body.password,
    };

    let boolEmailExist = await verifyEmailExist(user_login.email);

    if (boolEmailExist) {
      let connect_wait = await connectUser(
        user_login.email,
        user_login.password_login
      );

      if (connect_wait.evidence !== false) {
        print(connect_wait);
        let userFind = connect_wait.find_user;
        let hash_password = await connect_wait.find_user.password;

        let password_check = await passwordCompare(
          user_login.password_login,
          hash_password
        );

        if (password_check) {
          let token_rep = generateToken(userFind._id);
          let reponse_json = {
            user_name: userFind.user_name,
            id: userFind._id,
            token: token_rep,
          };
          return res.status(200).json(reponse_json);
        } else {
          return res.status(400).json({ message: "erreur sur mot de passe" });
        }
      }
    }
    if (!boolEmailExist) {
      return res
        .status(401)
        .json({ message: "Utilisateur non trouvé verifier vos champs" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Utilisateur non trouvé verifier vos champs" });
  }
};
