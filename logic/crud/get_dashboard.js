const { print } = require("print_console_log");
let Model_user = require("../../models/model_config_user");

exports.getDashBoard = async (req, res, next) => {
  print("GET DASHBOARD");

  let idUser = req.user_decoded.data;
  let dataUserProfile;
  print(idUser);

  try {
    let data = await Model_user.findOne({ _id: idUser });
    dataUserProfile = {
      user_name: data.user_name,
      email: data.email,
      admin: data.admin,
    };
    return res.status(200).json(dataUserProfile);
  } catch (err) {
    return res.status(400).json({ erreur: "profile non trouvé" });
  }
};
