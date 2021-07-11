import User from "../server/models/user.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin", 12);
  const user = {
    name: "Admin User",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  };

  const admin = await User.findOne({ email: user.email });

  if (admin) return;

  await User.create(user, function (e) {
    if (e) {
      throw e;
    }
  });
};

export default createAdmin;
