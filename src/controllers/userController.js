const User = require("../model/user");

const { sendingVerifyCode } = require("../utils/sendingVerifyCode");

exports.signup = async (req, resp) => {
  const user = new User(req.body);

  try {
    const token = await user.generateToken();
    await user.save();
    sendingVerifyCode(user.email, token);

    resp.status(201).send({ user });
  } catch (err) {
    resp.status(400).send();
  }
};

exports.confirmEmail = async (req, resp) => {
  //cheak the queury of the link if it exist send use the token method to vrifiy if not look at the body of request
  try {
    const user = await User.verfiy(req.query.email, req.query.token);

    resp.send(user);
  } catch (err) {
    resp.status(500).send();
  }
};

exports.login = async (req, resp) => {
  //cheak the status of account if not actvited send to confirm email route with waiting a code in the body of request
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    const token = await user.generateToken();
    resp.send(user);
  } catch (err) {
    resp.status(400).send({ error: err.message });
  }
};

exports.authTask = async (req, resp) => { // for testing get all user -- delete when deploy
  const users = await User.find({});

  resp.send(users);
};

//get my data by header token
exports.me = async (req, resp) => {
  try {
    resp.send(req.user);
  } catch (err) {
    resp.status(500).send();
  }
};

// prevent user from virfied more then one time
