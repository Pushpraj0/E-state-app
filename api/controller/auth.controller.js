import bcrypt from "bcrypt";
import prisma from "../lib/pirsma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // db op
  const { username, email, password } = req.body;
  // Hash password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // create a new user save to db

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ Message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  // db op
  const { username, password } = req.body;

  try {
    // check if the user exists
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ Message: "Invaild Credentials!" });
    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ Message: "Invaild Credentials!" });
    // genrate cookie token and send it to the user
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userInfo } = user;
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    res
      .cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite:"none",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Login Failed!" });
  }
};

export const logout = (req, res) => {
  // db op
  res.clearCookie("token").status(200).json({ Message: "Logout Successful" });
};
