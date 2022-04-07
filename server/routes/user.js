import express from "express";
import { followUnfollow, getFollowing, signin, signup} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/follow", auth , followUnfollow);
router.get("/following", auth, getFollowing)
export default router;
