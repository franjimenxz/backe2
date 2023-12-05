import passport from "passport";

import jwt, { ExtractJwt } from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const localStrategy = passport.Strategy;
// Configuración de passport
const initPassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
// Función para extraer el token de las cookies
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"] ?? null;
  }
  return token;
};

export default initPassport;
