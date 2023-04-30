const { print } = require("print_console_log");
let Model_user = require("../models/model_config_user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
let secret_token_jwt = "976mayotte";

exports.verifyEmailExist = async (email) => {
  try {
    let data = await Model_user.findOne({ email: email });
    if (data.email === email) return true;
  } catch (err) {
    return false;
  }
};

exports.generateToken = function (data) {
  let token = jwt.sign({ data: data }, secret_token_jwt, { expiresIn: "24h" });
  return token;
};

exports.passwordCompare = async function (mdpText, mdpHash) {
  let passwordCompare = bcrypt.compare(mdpText, mdpHash);
  return passwordCompare;
};

function emailRegex(email_arg) {
  let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_arg);
  if (email) return true;
  if (!email) return false;
}

function userNameTest(user_name_arg) {
  let minSizeName = 3;
  if (user_name_arg !== "" && user_name_arg.length > minSizeName) {
    return true;
  } else {
    return false;
  }
}

function passwordTest(password_arg) {
  let minSizePassword = 5;
  if (password_arg.length > minSizePassword) {
    return true;
  } else {
    return false;
  }
}

exports.createUser = async (
  user_name_arg,
  email_arg,
  password_arg,
  poste_arg
) => {
  let email_regex_bool = Boolean(emailRegex(email_arg));
  let user_name_test = Boolean(userNameTest(user_name_arg));
  let password_test = Boolean(passwordTest(password_arg));

  let password_hash = bcrypt.hashSync(password_arg, saltRounds);

  if (email_regex_bool && user_name_test && password_test) {
    // save data
    let modelPostUser = new Model_user({
      user_name: user_name_arg,
      email: email_arg,
      password: password_hash,
      admin: poste_arg,
    });

    let reponse_save = await modelPostUser
      .save()
      .then((reponse) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    return reponse_save;
  } else {
    return false;
  }
};

exports.connectUser = async (user_email, user_password_text) => {
  print(user_password_text);
  let email_regex_bool = Boolean(emailRegex(user_email));
  let password_test = Boolean(passwordTest(user_password_text));

  if (email_regex_bool && password_test) {
    let find_user = await Model_user.findOne({ email: user_email });

    if (find_user !== null) {
      return { evidence: true, find_user };
    } else {
      return { evidence: false };
    }
  }
};

exports.findUserIdAndName = async (idUser) => {
  const resultat = await Model_user.findOne({ _id: idUser });
  return resultat;
};
