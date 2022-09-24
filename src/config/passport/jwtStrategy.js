const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../../models");

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) {
        done(null, false);
        return;
      }
      // const token = req.headers.authorization.slice(7);
      // console.log(token);
      // console.log(user.token);
      // if (user.token !== token) {
      //   done(new Error("Tokens doesn't match"), false);
      //   return;
      // }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);
module.exports = jwtStrategy;
