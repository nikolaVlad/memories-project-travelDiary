import express from "express";
import { changeFollow, getFollowers, getFollowings, signin, signup, editProfile } from "../controllers/user.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/edit", auth, editProfile)
router.get("/followings", auth, getFollowings)
router.get("/followers", auth, getFollowers);
router.patch("/changeFollow", auth, changeFollow);

export default router;
