import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.requiredOption("--mode <mode>", "Mode App", "development");
program.parse();

const env = program.opts().mode;

dotenv.config({
  path: env === "production" ? "./.env.prod" : "./.env.dev",
});

export default {
  DB: process.env.DB,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  PORT: process.env.PORT,
  MODE: process.env.MODE,
};
