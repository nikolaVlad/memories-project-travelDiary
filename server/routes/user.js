import express from "express";
import { changeFollow, getFollowings, signin, signup } from "../controllers/user.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/followings", auth, getFollowings)
router.patch("/changeFollow", auth, changeFollow);

export default router;
