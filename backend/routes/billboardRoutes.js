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
    res.send([{ msg: "Billboard created successfully" }]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

// add images to billboard
router.put("/addtobillboard", isAuth(), isAdmin, async (req, res) => {
  const image = req.body.image;
  const billboardId = req.body.billboardId;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: `billboard_${billboardId}`,
    });
    const oldBillboard = await Billboard.findOne({ _id: billboardId });
    const updateBillboard = await Billboard.updateOne(
      { _id: billboardId },
      {
        billboard: [...oldBillboard.billboard, uploadResponse.secure_url],
      }
    );

    res.send([{ msg: "billboard image has been added successfully" }]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

//get all billboards

router.get("/allbillboards", async (req, res) => {
  try {
    const response = await Billboard.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});

//select home billboard

router.put("/selecthomebillboard/:id", isAuth(), isAdmin, async (req, res) => {
  const billboardId = req.params.id;
  try {
    const response = await Billboard.updateMany(
      { selected: true },
      { selected: false }
    );
    const selectedbillboard = await Billboard.findOneAndUpdate(
      { _id: billboardId },
      { selected: true }
    );
    res.send([
      { msg: `${selectedbillboard.name} has been selected for home page` },
    ]);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});
// get selected billboard
router.get("/homebillboard", async (req, res) => {
  try {
    const response = await Billboard.findOne({ selected: true });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: error.message }]);
  }
});
module.exports = router;
