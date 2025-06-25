import express from "express";
import { actualizarMonstruo, borrarMonstruo, crearMonstruos, getMonstruo, getMonstruos } from "../controladores/monstruo.controladores.js";

const router = express.Router();

router.get("/", getMonstruos);
router.get("/:id", getMonstruo);
router.post("/", crearMonstruos);
router.put("/:id", actualizarMonstruo);
router.delete("/:id", borrarMonstruo);

export default router;

