const { reset } = require("nodemon");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user.models");
const ValidateRegister = require("../validator/register.validator");
const ValidateLogin = require("../validator/login.validator");
const jwt = require("jsonwebtoken");

/* Register Controller */

const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  req.body.password = bcryptjs.hashSync(req.body.password, 10);
  
  try {
    if (!isValid) {
      res.status(500).json(errors);
    } else {
      const exist = await UserModel.findOne({ email: req.body.email });
      if (exist) {
        return res.status(404).json({ email: "user exists, please try again" });
      }

      await UserModel.create(req.body).then((createdUser) => {
        const payload = {
          id: createdUser._id,
          email: createdUser.email,
          fullname: createdUser.fullname,
          role: createdUser.role,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });

        res.status(200).json({ token: token });
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/* Register Controller */

/* Login Controller */

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      return res.status(500).json(errors);
    } else {
      const existUser = await UserModel.findOne({ email: req.body.email });
      if (!existUser) {
        return res
          .status(404)
          .send({ email: "User Does Not Exist, Please Create an Account" });
      } else {
        const match = await bcryptjs.compare(
          req.body.password,
          existUser.password
        );

        /* Password Match */
        if (!match) {
          return res.status(404).json({ password: "Invalid Password" });
        } else {
          const payload = {
            id: existUser._id,
            email: existUser.email,
            fullname: existUser.fullname,
            role: existUser.role,
          };

          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d",
          });
          res.status(200).json({ token: token });
        }
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* Login Controller */

module.exports = {
  Register,
  Login,
};
