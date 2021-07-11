import express from "express";
import { createComment, getCommentsForPost, deleteComment,updateComment } from "../controllers/comments.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', createComment);
router.get('/', getCommentsForPost);
router.delete('/:id', deleteComment);
router.patch('/:id', updateComment)

export default router;

