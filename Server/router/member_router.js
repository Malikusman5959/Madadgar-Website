const express = require("express");
const memberController = require("./../controller/member");
const memeberRouter = express.Router();

memeberRouter
  .route("/member")
  .post(memberController.addMember)
  .get(memberController.getAllMembers);

memeberRouter
  .route("/member/:id")
  .get(memberController.getMemeberByID)
  .patch(memberController.updateMemberByID);
module.exports = memeberRouter;
