import bcrypt from "bcrypt";

// Crea un hash de una contraseña
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Compara una contraseña con un hash
const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { createHash, compareHash };
