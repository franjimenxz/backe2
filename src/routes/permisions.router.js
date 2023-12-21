import { Router } from "express";
import { userService } from "../dao/repositories/index.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/enums.js";

const router = Router();

router.get("/premium/:uid", async (req, res) => {
  let uid = req.params.uid;
  let user = await userService.getUserById(uid);
  let requirements = [
    "identificacion",
    "comprobante de domicilio",
    "comprobante de estado de cuenta",
  ];
  let missingDocuments = [];
  let count = 0;
  requirements.forEach((requirement) => {
    if (user.documents.includes(requirement)) {
      res.send(`Ya tienes este documento: ${requirement}`);
      count++;
    } else {
      missingDocuments.push(requirement);
      res.send(`No tienes este documento: ${requirement}`);
    }
  });

  if (req.user.role === "premium") {
    await userService.updateUser(user.email, { role: "user" });
    return res.send("Eres usuario normal");
  } else if (req.user.role === "user") {
    if (count === 3) {
      res.send("Ya tienes todos los documentos");

      await userService.updateUser(user.email, { role: "premium" });
      return res.send("Eres usuario premium");
    } else {
      CustomError.createError({
        name: "Tienes documentos pendientes",
        cause: "No tienes todos los documentos",
        message: `Te faltan los siguientes documentos: ${missingDocuments}`,
        code: ErrorCodes.INVALID_TYPES_ERROR,
      });
      res.send("No tienes todos los documentos");
    }
  }
});
export default router;
