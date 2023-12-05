import passport from "passport";
import jwt from "jsonwebtoken";
import UserCurrentDTO from "../dao/dto/userCurrent.dto.js";

// Autenticación con passport
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({
          error: info.messages ? info.messages : info.toString(),
        });
      }
      req.user = new UserCurrentDTO(user);
      next();
    })(req, res, next);
  };
};

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization ?? req.cookies.token;
  if (!authHeader) {
    return res.status(401).redirect("/login?requiredLogin=true");
  }
  const token = authHeader.split(" ")[1] ?? authHeader; //Remove "Bearer"
  jwt.verify(token, process.env.JWT_SECRET, (error, credentiales) => {
    if (error) {
      return res.status(403).redirect("/login?failedLogin=true");
    }
    req.user = credentiales;
    req.logger.info("Usuario autenticado");
    next();
  });
};
