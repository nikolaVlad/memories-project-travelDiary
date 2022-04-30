import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role: 'member',
      followings: []
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "3h",
    });


    res.status(200).json({ result, token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFollowings = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).send({ message: 'Error: User not exist.' })
    }

    res.status(200).send(user?.followings || []);
  } catch (err) {
    res.status(404).json({ message: err.mesage });
  }
}

// #point
export const changeFollow = async (req, res) => {
  // Login user id
  const { userId } = req;
  const { followingUserId } = req.body;

  const user = await User.findById(userId);

  // Izvuko sam user-a koga pratimo
  const followingUser = await User.findById(followingUserId);

  const indexes = user.followings.map(user => String(user._id));

  const index = indexes.findIndex((id) => id === String(followingUserId));

  if (index === -1) {
    // Follow user
    console.log('Followed user.')
    const { _id, name, email } = followingUser
    user.followings.push({ _id, name, email });
  } else {
    // Unfollow user
    console.log('Unfollowed user.')
    user.followings = user.followings.filter((user) => {
      user._id !== String(followingUserId)
    });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });

  res.status(200).send(updatedUser);
}