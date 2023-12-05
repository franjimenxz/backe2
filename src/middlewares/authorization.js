// Verifica si el usuario esta autenticado
export const authorization = () => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({
        error: "Unauthorized",
      });
    }
    next();
  };
};

export const isAdmin = () => {
  return (req, res, next) => {
    req.logger.debug(req.user);
    if (req.user.role !== "admin") {
      return res.status(403).send({
        error: "Not permissions",
      });
    }
    next();
  };
};

export const isUser = () => {
  return (req, res, next) => {
    req.logger.debug(req.user);
    if (req.user.role !== "user") {
      return res.status(403).send({
        error: "Not permissions",
      });
    }
    next();
  };
};
