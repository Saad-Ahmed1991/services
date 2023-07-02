const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const Billboard = require("../models/Billboard");

// create billboard
router.post("/createbillboard", isAuth(), isAdmin, async (req, res) => {
  const name = req.body.name;
  try {
    const newBillboard = new Billboard({ name: name });
    await newBillboard.save();
    res.send("billboard created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

// add billboards
router.put("/addtobillboard", isAuth(), isAdmin, async (req, res) => {
  const image = req.body.image;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: `billboard`,
    });
    const currentBillboard = await Billboard.find();
    const updateBillboard = await Billboard.updateOne(
      { _id: currentBillboard[0]._id },
      {
        billboard: [
          ...currentBillboard[0].billboard,
          uploadResponse.secure_url,
        ],
      }
    );

    res.send([{ msg: "billboard image has been added successfully" }]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

//get billboards

router.get("/allbillboards", async (req, res) => {
  try {
    const response = await Billboard.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

module.exports = router;
