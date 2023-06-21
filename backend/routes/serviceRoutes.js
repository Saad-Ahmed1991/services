const express = require("express");
const { validator, serviceRules } = require("../middlewares/validator");

const { cloudinary } = require("../utils/cloudinary");
const Profile = require("../models/Profile");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const Service = require("../models/Service");

router.get("/test", (req, res) => {
  res.send("router service test");
});

//add service
router.post("/addservice", isAuth(), async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newService = new Service(req.body);
    newService.user = req.user._id;
    await newService.save();
    const response = await User.updateOne(
      { _id: req.user._id },
      { hasService: true }
    );
    res.send({ msg: "new service added", newService });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//get current user service

router.get("/currentservice", isAuth(), async (req, res) => {
  try {
    const currentService = await Service.findOne({
      user: req.user._id,
    })
      .populate("user", "firstName lastName email")
      .populate("profile");
    res.send(currentService);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//upload multiple images

router.put("/uploadimages", isAuth(), async (req, res) => {
  const urls = [];
  const userFolderName = `${req.user._id}`;
  let subfolderName = `upload-${Date.now()}`;

  if (req.body.subfolderName) {
    subfolderName = req.body.subfolderName;
  }

  try {
    // Check if the user's folder exists on Cloudinary
    const userFolderExists = await cloudinary.api.root_folders({
      resource_type: "image",
      type: "upload",
    });
    const userFolderExistsArr = userFolderExists.folders.filter(
      (folder) => folder.name === userFolderName
    );

    if (userFolderExistsArr.length === 0) {
      // Create the user's folder if it doesn't exist
      await cloudinary.api.create_folder(userFolderName);
    }

    // Check if the subfolder already exists inside the user's folder
    const subfolderExists = await cloudinary.api.sub_folders(userFolderName);
    const subfolderExistsArr = subfolderExists.folders.filter(
      (folder) => folder.name === subfolderName
    );

    if (subfolderExistsArr.length === 0) {
      // Create the subfolder inside the user's folder if it doesn't exist
      await cloudinary.api.create_folder(`${userFolderName}/${subfolderName}`);
    }

    for (let i = 0; i < req.body.images.length; i++) {
      const imageString = req.body.images[i];

      // Upload the image to the specified subfolder
      const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: `${userFolderName}/${subfolderName}`,
      });

      urls.push(uploadResponse.secure_url);
    }
    console.log(urls);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }

  try {
    const oldService = await Service.findOne({ user: req.user._id });
    oldService.images = [...oldService.images, ...urls];

    let albumExists = false;
    for (let i = 0; i < oldService.albums.length; i++) {
      const album = oldService.albums[i];
      if (album.title === subfolderName) {
        album.album = [...album.album, ...urls];
        albumExists = true;
        break;
      }
    }

    if (!albumExists) {
      oldService.albums.push({ title: subfolderName, album: urls });
    }

    await oldService.save();
    res.send({ msg: "Images successfully added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//delete image

router.put("/deleteimage", isAuth(), async (req, res) => {
  const imageUrl = req.body.imageUrl;
  console.log("imageUrl", imageUrl);
  try {
    const updatedService = await Service.findOne({ user: req.user._id });
    console.log("updatedService", updatedService);
    updatedService.images = updatedService.images.filter(
      (img) => img !== imageUrl
    );
    await updatedService.save();

    res.send({ msg: "picture deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// get row services

router.get("/services", async (req, res) => {
  const categories = req.query.category
    ? req.query.category.split(",").slice(0, 4)
    : []; // Split the comma-separated categories and get the first 4
  try {
    if (categories.length != 0) {
      const services = await Service.aggregate([
        { $match: { profession: { $in: categories } } },
        {
          $group: {
            _id: "$profession",
            services: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            services: { $slice: ["$services", 6] },
          },
        },
        { $unwind: "$services" },
        {
          $lookup: {
            from: "users", // Assuming the collection name for the User model is 'users'
            localField: "services.user",
            foreignField: "_id",
            as: "services.user",
          },
        },
        {
          $lookup: {
            from: "profiles", // Assuming the collection name for the Profile model is 'profiles'
            localField: "services.profile",
            foreignField: "_id",
            as: "services.profile",
          },
        },
        { $unwind: "$services.user" },
        { $unwind: "$services.profile" },
        {
          $replaceRoot: {
            newRoot: "$services",
          },
        },
      ]);

      res.send(services);
    } else {
      const service = await Service.find()
        .populate("user", "firstName lastName email createdOn")
        .populate("profile");
      res.send(service);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// get all service
router.get("/search", async (req, res) => {
  const { city, profession, rating, page, limit } = req.query;

  try {
    let profileQuery = {};

    if (city) {
      profileQuery.city = city.toLocaleLowerCase();
    }

    const profileIds = await Profile.find(profileQuery, "_id").lean();

    const serviceQuery = {
      profile: { $in: profileIds },
    };

    if (profession) {
      serviceQuery.profession = profession.toLocaleLowerCase();
    }

    if (rating) {
      serviceQuery.totalRating = { $gte: parseInt(rating) };
    }

    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

    const totalCount = await Service.countDocuments(serviceQuery);
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    const results = await Service.find(serviceQuery)
      .populate("profile", "-__v")
      .populate("user", "firstName lastName email createdOn")
      .skip(options.skip)
      .limit(options.limit)
      .lean();

    res.send({
      pagination: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        totalPages,
        totalCount,
      },
      results,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
});

//get one user service

router.get("/userservice/:userid", async (req, res) => {
  const userId = req.params.userid;
  try {
    const service = await Service.findOne({ user: userId })
      .populate("user", "firstName lastName email createdOn")
      .populate("profile");
    res.send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//update service

router.put("/updateservice", isAuth(), async (req, res) => {
  try {
    const service = await Service.updateOne(
      { user: req.user._id },
      { ...req.body }
    );
    if (!service.modifiedCount) {
      return res.status(400).send({ msg: "service already updated" });
    }
    res.send({ msg: "service updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//rating

router.put("/rate", isAuth(), async (req, res) => {
  try {
    const { serviceId, ratingNumber } = req.body;
    const user = req.user;

    const service = await Service.findOne({ _id: serviceId });

    const userIndex = service.rating.findIndex((item) =>
      item.userId.equals(user._id)
    );

    if (userIndex !== -1) {
      // User exists, update rating
      const oldRating = service.rating[userIndex].rating;
      service.rating[userIndex].rating = ratingNumber;
      service.totalRating = service.totalRating - oldRating + ratingNumber;
      console.log("Rating updated successfully");
    } else {
      // User doesn't exist, add new rating
      service.rating.push({ userId: user._id, rating: ratingNumber });
      service.totalRating += ratingNumber;
    }

    await service.save();

    res.send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// follow

router.put("/follow/:userid", isAuth(), async (req, res) => {
  const myId = req.user._id;
  const userId = req.params.userid;

  try {
    const userService = await Service.updateOne(
      { user: userId },
      { $push: { followers: myId } }
    );
    if (!userService.modifiedCount) {
      return res.status(400).send({ msg: "you already followed this profile" });
    }
    const myService = await Service.updateOne(
      { user: myId },
      { $push: { following: userId } }
    );
    res.send({ msg: "profile followed" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// follow

router.put("/unfollow/:userid", isAuth(), async (req, res) => {
  const myId = req.user._id;
  const userId = req.params.userid;
  try {
    const userService = await Service.updateOne(
      { user: userId },
      { $pull: { followers: myId } }
    );
    if (!userService.modifiedCount) {
      return res
        .status(400)
        .send({ msg: "you already unfollowed this profile" });
    }
    const myService = await Service.updateOne(
      { user: myId },
      { $pull: { following: userId } }
    );
    res.send({ msg: "profile unfollowed" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
//get service followers

router.get("/followers/:serviceid", async (req, res) => {
  const { serviceid } = req.params;
  try {
    const service = await Service.findOne({ _id: serviceid });

    const followersList = await Service.find({
      user: { $in: service.followers },
    })
      .select("-totalRating -following -followers -images -profession -rating")
      .populate("profile", "profileImg")
      .populate("user", "firstName lastName");
    res.send(followersList);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

//get service following list

router.get("/following/:serviceid", async (req, res) => {
  const { serviceid } = req.params;
  try {
    const service = await Service.findOne({ _id: serviceid });

    const followingList = await Service.find({
      user: { $in: service.following },
    })
      .select("-totalRating -following -followers -images -profession -rating")
      .populate("profile", "profileImg")
      .populate("user", "firstName lastName");
    res.send(followingList);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// get albums names

/*
router.get("/albums/:username", isAuth(), async (req, res) => {
  const userName = req.params.username;
  const userFolderName = `${userName}`;

  try {
    // Retrieve subfolders (albums) within the user's parent folder
    const subfolders = await cloudinary.api.sub_folders(userFolderName);

    // Extract the names of the subfolders
    const albumNames = subfolders.folders.map((folder) => folder.name);

    res.send({ albums: albumNames });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
*/
router.get("/albums/:userid", isAuth(), async (req, res) => {
  const { userid } = req.params;
  try {
    const response = await Service.findOne({ user: userid }).select("albums");
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
