const express = require("express");
const router = express.Router();
const Notification = require("../model/Notification");
const JobNotification = require("../model/JobNotification");
const ServiceProvider = require("../model/ServiceProivder");

router.get("/getNotifications/:userId", async (req, res) => {
  try {

    const user = await Notification.findOne({ user: req.params.userId })
      .populate("notifications.user")
      .populate("notifications.question").sort({createdAt:-1});

    return res.json(user.notifications);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.get("/getJobNotifications/:userId", async (req, res) => {
  try {

    const user = await JobNotification.find({userToNotify:{ $in: req.params.userId } })
      .populate("notifications.user")
      .populate("notifications.post").sort({createdAt:-1});
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.post("/notification/:userId", async (req, res) => {
  try {
    const { userId } = req.params.userId;

    const user = await ServiceProvider.findById(userId);

    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }
    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;