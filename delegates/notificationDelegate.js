const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')
const email = require("../services/Email");

const getNotificationsByUserId = async (userId) => {
  await matchDelegate.getEndedMatchesByUserToReview(userId);
  return notificationService.getNotificationsByUserId(userId);
}

const createNotification = async (notificationData) => {
  return notificationService.createNotification(notificationData)
}

//SendEmail

const oEmail = new email({
  "host":"smtp.gmail.com",
  "port":"465",
  "secure":true,
  "auth":{
      "type":"login",
      "user":"alvoscares@gmail.com",
      "pass":"la809C15"
  }
});


const sendEmail = async (notificationData) => {
  let email = {
    from: "alvoscares@gmail.com",
    to: "alvoscares@gmail.com",
    subject: "Mail de prueba wer",
    html: `
        Hola mundo alvoscares XDXDXD
  `
  }
  oEmail.enviarCorreo(email);
  // res.send("ok");
  
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  sendEmail
}
