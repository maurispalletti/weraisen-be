const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')
const userDelegate = require('../delegates/userDelegate')

const email = require("../services/Email");
//Plantillas de mails
//const tmp_usuario_aprobado = require("../tmp_mails/tmp_usuario_aprobado.html")


const getNotificationsByUserId = async (userId) => {
  await matchDelegate.getEndedMatchesByUserToReview(userId);
  return notificationService.getNotificationsByUserId(userId);
}

const getUnreadNotificationsByUserId = async (userId) => {
  return notificationService.getUnreadNotificationsByUserId(userId);
}

const createNotification = async (notificationData) => {
  return notificationService.createNotification(notificationData)
}

//SendEmail

const oEmail = new email({
  "host": "smtp.gmail.com",
  "port": "465",
  "secure": true,
  "auth": {
    "type": "login",
    "user": "weraisen.test@gmail.com",
    "pass": "alvo1234"
  }
});


const sendEmail = async (emailData) => {
  console.log(emailData);
  var textoMail = ``;
  var asuntoMail = "";
  switch (emailData.origen) {

    //Usuario aprobado
    case 1:
      textoMail = 'tmp_mails/tmp_usuario_aprobado.html'
      asuntoMail = "¡Usuario de WER aprobado!"
      break;
    //Usuario denegado
    case 2:
      textoMail = 'tmp_mails/tmp_usuario_denegado.html'
      asuntoMail = "Usuario de WER denegado"
      break;
    //Restablecer contraseña
    case 3:
      const userIdResp = await userDelegate.findUserByEmail(emailData.emailDestino)
      const idToSendEmail = userIdResp._id

      textoMail = `Hola! Sabemos que perdiste tu contraseña de WeRaisen. ¡Lo sentimos por eso!
        ¡Pero no te preocupes! Podes usar el siguiente link para restablecer tu contraseña: Si no usas este enlace dentro de las 3 horas, caducará. 
        http://localhost:3000/ChangePassword/${idToSendEmail}        
        Gracias. El equipo de WeRaisen.`

      asuntoMail = "Restablecé tu contraseña"
      break;

    //Cuenta bloqueada
    case 4:
      textoMail = 'tmp_mails/tmp_cuenta_bloqueada.html'
      asuntoMail = "Cuenta bloqueada"
      break;

  }

  let email = {
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject: asuntoMail,    
    html: { path: textoMail },
  }
  oEmail.enviarCorreo(email);
  // res.send("ok");  
}

const updateNotificationsStatus = async (userId, status) => {
  notificationService.updateNotificationsStatus(userId, status)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  sendEmail,
  updateNotificationsStatus,
  getUnreadNotificationsByUserId,
}
