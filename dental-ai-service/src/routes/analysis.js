import express from "express";
import { handleAnalyzeCall } from "../controllers/analysisController.js";

import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file uploads with proper extensions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// POST /api/analyze-call
// Accepts either a JSON body with a 'transcript' OR an audio file via form-data ('audio' field)
router.post("/", upload.single('audio'), handleAnalyzeCall);

export default router;
