const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')
const email = require("../services/Email");
//Plantillas de mails
//const tmp_usuario_aprobado = require("../tmp_mails/tmp_usuario_aprobado.html")


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
      "user":"weraisen.test@gmail.com",
      "pass":"alvo1234"
  }
});


const sendEmail = async (emailData) => {
console.log(emailData);
  var textoMail = ``;
  var asuntoMail = "";
  switch(emailData.origen) {

    //Usuario aprobado
    case 1:
      textoMail = `¡Hola! Tu usuario fue aprobado con éxito. Estamos felices de darte la bienvenida a nuestra comunidad.
      Al presionar el siguiente link ya podrás disfrutar de nuestros servicios:
      https://login
      ¡Muchas gracias! El equipo de WeRaisen.`

      asuntoMail = "¡Usuario de WER aprobado!"
      break;
      //Usuario denegado
    case 2:
      textoMail = `¡Hola! No pudimos validar tu usuario. Había inconsistencias en los datos ingresados. Si crees que hubo un error, volvé a intentarlo con el siguiente link:
      https://signup
      ¡Muchas gracias! El equipo de WeRaisen.`

      asuntoMail = "Usuario de WER denegado"      
      break;
    //Restablecer contraseña
      case 3:
        textoMail = `Hola! Sabemos que perdiste tu contraseña de WeRaisen. ¡Lo sentimos por eso!

        ¡Pero no te preocupes! Podes usar el siguiente link para restablecer tu contraseña: Si no usas este enlace dentro de las 3 horas, caducará. 
        
        https://link.
        
        Gracias. El equipo de WeRaisen.`

      asuntoMail = "Restablecé tu contraseña"      
      break;

      //Cuenta bloqueada
      case 4:
        textoMail = `Hola! Lamentamos comunicarte que tu cuenta de WeRaisen ha sido bloqueada durante 15 días, ya que consideramos que infringiste nuestras normas comunitarias.
        En 15 días te esperamos para seguir formando parte de nuestra plataforma. En caso de que se vuelva a detectar un comportamiento inesperado, debemos bloquearte la cuenta de forma definitiva. ¡Esperamos no tener que llegar a eso!
        
        Saludos, el equipo de WeRaisen.`

      asuntoMail = "Cuenta temporalmente bloqueada"      
      break;

  }

  let email = {
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject:  asuntoMail,
    html: textoMail,
  }
  oEmail.enviarCorreo(email);
  // res.send("ok");  
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  sendEmail
}
