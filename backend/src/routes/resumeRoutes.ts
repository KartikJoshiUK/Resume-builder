import { Router } from "express";
import {
  createResume,
  getResume,
  updateResume,
} from "../controllers/resumeController";

const router = Router();

router.post("/getResume", getResume);
router.post("/resume", createResume);
router.patch("/resume", updateResume);

export default router;
