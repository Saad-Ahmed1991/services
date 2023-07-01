const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const {
  validator,
  logInRules,
  userRegisterRules,
} = require("../middlewares/validator");

router.get("/test", (req, res) => {
  res.send("router user test");
});

// user sign up

router.post("/signup", userRegisterRules(), validator, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role == "admin" || role == "superAdmin") {
      return res.status(401).send([{ msg: "unauthorized" }]);
    }
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send([{ msg: "user already exist" }]);
    }
    const newUser = new User(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res.send([{ msg: "user added successfully" }]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

// log in

router.post("/login", logInRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).send([{ msg: "incorrect email or password" }]);
    }
    const match = await bcrypt.compare(password, existUser.password);
    if (!match) {
      return res.status(400).send([{ msg: "incorrect email or password" }]);
    }
    if (existUser.isBanned) {
      return res.status(400).send([{ msg: "user banned" }]);
    }
    existUser.password = undefined;
    const payload = { _id: existUser._id };
    const token = jwt.sign(payload, process.env.PRIVATEKEY);
    res.send({ user: existUser, token });
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

//get current user

router.get("/current", isAuth(), async (req, res) => {
  res.send({ user: req.user });
});

//get all workers

router.get("/allworkers", async (req, res) => {
  try {
    const allworkers = await User.find({ role: "worker" });
    res.send(allworkers);
  } catch (error) {
    console.log("error");
    res.status(400).send([{ msg: error }]);
  }
});

//get all users

router.get("/allusers", isAuth(), isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const users = await User.find()
      .select("_id firstName lastName email role isBanned")
      .skip(startIndex)
      .limit(limit);

    const totalCount = await User.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    res.send({
      users,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    res.status(400).send([{ msg: error.message }]);
  }
});

// delete user

router.delete("/deleteuser/:iddelete", isAuth(), isAdmin, async (req, res) => {
  const idDelete = req.params.iddelete;

  try {
    const deleteResponse = await User.deleteOne({ _id: idDelete });
    const deleteProfile = await Profile.deleteOne({ user: idDelete });
    const deleteService = await Service.deleteOne({ user: idDelete });
    if (deleteResponse) {
      return res.send([{ msg: "User deleted" }]);
    }

    return res.status(400).send([{ msg: "user already deleted" }]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

//update user
router.put("/edituser/:id", isAuth(), isAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
    if (!updatedUser.modifiedCount) {
      return res.status(400).send([{ msg: "user already updated" }]);
    }
    res.send({ msg: "user successfully updated " });
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});
module.exports = router;
