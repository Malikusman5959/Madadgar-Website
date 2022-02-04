const ServiceProivder = require("../model/ServiceProivder");
const Notification = require("../model/Notification");

const JobNotification = require("../model/JobNotification");

const setNotificationToUnread = async userId => {
  try {
    const user = await ServiceProivder.findById(userId);

    if (!user.unreadNotification) {
      user.unreadNotification = true;
      await user.save();
    }

    return;
  } catch (error) {
    console.error(error);
  }
};


const newAnswerNotification = async (
  questionId,
  answerId,
  userId,
  userToNotifyId,
  text
) => {
    
  try {
    

    const userToNotify = await Notification.findOne({ user: userToNotifyId });
    if(userToNotify !=null){

    const newNotification = {
      user: userId,
      type: "newAnswer",
      question: questionId,
      answerId,
      text,
      date: Date.now()
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();
    await setNotificationToUnread(userToNotifyId);
    return;
    }

    const newNotification = {
      user: userId,
      type: "newAnswer",
      question: questionId,
      answerId,
      text,
      date: Date.now()
    };

    const createNotification = new Notification({
      user: userToNotifyId,
      notifications: [newNotification],
    });

    await createNotification.save();
    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.error(error);
  }
};

const newVoteNotification = async (
  questionId,
  answerId,
  userId,
  userToNotifyId,
) => {
    
  try {
    

    const userToNotify = await Notification.findOne({ user: userToNotifyId });
    if(userToNotify !=null){

    const newNotification = {
      user: userId,
      type: "newVote",
      question: questionId,
      answerId,
      date: Date.now()
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();
    await setNotificationToUnread(userToNotifyId);
    return;
    }

    const newNotification = {
      user: userId,
      type: "newVote",
      question: questionId,
      answerId,
      date: Date.now()
    };

    const createNotification = new Notification({
      user: userToNotifyId,
      notifications: [newNotification],
    });

    await createNotification.save();
    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.error(error);
  }
};

const newJobNotification = async (
  postId,
  usersToNotifyId,
  userId,
  text
) => {
  try {

  
    const newNotification = {
      user: userId,
      type: "newJob",
      post: postId,
      text: text,
      date: Date.now()
    };
    let users = [];
    for(var i = 0;i<usersToNotifyId.length;i++){
      var usersID= usersToNotifyId[i]._id;
      users.push(usersID)
      } 
    console.log(users);
    const createNotification = new JobNotification({
      userToNotify: users,
      notifications: [newNotification],
    });

    await createNotification.save();
    return;
  } catch (error) {
    console.error(error);
  }
};


const newResponseNotification = async (
  jobId,
  userToNotifyId,
  userId,
  text
) => {
  try {

  
    const newNotification = {
      user: userId,
      type: "newResponse",
      post: jobId,
      text: text,
      date: Date.now()
    };

    const createNotification = new JobNotification({
      userToNotify: userToNotifyId,
      notifications: [newNotification],
    });

    await createNotification.save();
    return;
  } catch (error) {
    console.error(error);
  }
};

const hireNotification = async (
  jobId,
  userToNotifyId,
  userId,
  text
) => {
  try {

  
    const newNotification = {
      user: userId,
      type: "hire",
      post: jobId,
      text: text,
      date: Date.now()
    };

    const createNotification = new JobNotification({
      userToNotify: userToNotifyId,
      notifications: [newNotification],
    });

    await createNotification.save();
    return;
  } catch (error) {
    console.error(error);
  }
};

const completeJobNotification = async (
  jobId,
  userToNotifyId,
  userId,
  text
) => {
  try {

  
    const newNotification = {
      user: userId,
      type: "complete",
      post: jobId,
      text: text,
      date: Date.now()
    };

    const createNotification = new JobNotification({
      userToNotify: userToNotifyId,
      notifications: [newNotification],
    });

    await createNotification.save();
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
 
  newAnswerNotification,
  newVoteNotification,
  newJobNotification,
  newResponseNotification,
  hireNotification,
  completeJobNotification
};