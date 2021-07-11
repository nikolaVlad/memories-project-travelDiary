import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import createAdmin from "./seed.js";

import commentRouter from './routes/comments.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use('/comments' , commentRouter)

const PORT = process.env.PORT;
createAdmin();
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
