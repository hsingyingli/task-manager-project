import express from "express";
import { refresh } from "../controller/refreshToken.js";

const router = express.Router();

// all router here start with /refresh
router.get('/', refresh)



export default router;
