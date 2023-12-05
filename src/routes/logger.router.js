import Router from "express";
import config from "../config/config.js";
const router = Router();

router.get("/loggerTest", async (req, res) => {
  try {
    if (config.MODE === "prod") {
      req.logger.info("Logger Test Info");
      req.logger.error("Logger Test Error");
    } else {
      req.logger.debug("Logger Test Debug");
    }
    res.status(200).json({ message: "Logger Test" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Logger Test" });
  }
});

export default router;
