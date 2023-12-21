import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.requiredOption("--mode <mode>", "Mode App", "dev");
program.parse();

const env = program.opts().mode;

dotenv.config({
  path: env === "prod" ? "./.env.prod" : "./.env.dev",
});

export default {
  DB: process.env.DB,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
