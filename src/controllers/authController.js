const { User } = require("../models");
const auth = require("../utils/auth");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (auth.isExistent(User, username, "Username already in use", res)) {
      res.status(422).send("Username already in use");
      return;
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      username,
      password: hashedPassword,
    });
    const token = await auth.generateToken(user, "30m");

    // user.token = token;
    // await user.save();
    // console.log(user.token);
    res.json({
      user,
      token,
    });
    // 1. Створіть нового користувача з унікальним username та зашифрованим паролем
    // 2. Підготуйте payload для генерації jwt токена
    // 3. Згенеруйте jwt токен
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.status(422).send("Wrong credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(422).send("Wrong credentials");
    }
    const token = await auth.generateToken(user, "30m");

    // user.token = token;
    // await user.save();
    // console.log(user);
    res.json({
      user,
      token,
    });
    // 1. Виконайте валідацію полей username, password
    // 2. Підготуйте payload та згенеруйте jwt токен
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getProfile = async (req, res, next) => {
  res.json(req.user);
  // 1. Забороніть використання роута для неавторизованих користувачів
  // 2. У відповідь передайте дані авторизованого користувача
};
