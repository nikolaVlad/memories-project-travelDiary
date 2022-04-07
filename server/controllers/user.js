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
  console.log('desi se');
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
      following : []
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// New UPDATES

export const followUnfollow = async (req, res) =>
{
  const {followerId} = req.body;
  const {userId} = req;
  let {following : followingUsers} = await User.findById(userId)

  // If user was followed
  if(followingUsers.includes(followerId))
  {
    followingUsers = followingUsers.filter((user) =>
    {
      user !== followerId;
    })
    await User.findByIdAndUpdate(userId,{following : [...followingUsers]});
    console.log("User unfollowed")
    return res.status(200).send('User successfully unfollow.')
  }

  // If user still not followed
  else
  {
    await User.findByIdAndUpdate(userId,{following : [...followingUsers, followerId]});
    console.log("User followed")
    return res.status(200).send('User successfully follow.')
  }

}

export const getFollowing = async (req, res) =>
{
  const {userId} = req;

  const user = await User.findById(userId);
  const {following} = user
  console.log(following);

  res.status(200).send(following);
}
