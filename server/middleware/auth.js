import jwt from "jsonwebtoken";
import User from '../models/user.js'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;

      const { role } = await User.findById(req.userId)

      req.userRole = role;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
