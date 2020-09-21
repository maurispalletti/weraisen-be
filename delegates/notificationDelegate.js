const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')
const userDelegate = require('../delegates/userDelegate')
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const ics = require('ics')
// const hbs = require('handlebars')
const email = require("../services/Email");




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



var mailer = nodemailer.createTransport({
  "host": "smtp.gmail.com",
  "port": "465",
  "secure": true,
  "auth": {
    "type": "login",
    "user": "weraisen.test@gmail.com",
    "pass": "alvo1234"
  }
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const sendEmailCuentaBloqueada = async (emailData) => {  

  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)
  
  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'mailAlvo', // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  mailer.sendMail({
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject: "Cuenta bloqueada",
    template: 'tmpl_cuenta_bloqueada',
    context: {
      username: destinatario.firstName,
      id: destinatario._id,
      textoEmail:"Lamentamos comunicarte que tu cuenta de WeRaisen ha sido bloqueada, ya que consideramos que infringiste nuestras normas comunitarias."
    },
    
  }, function (err, response) {
    if (err) {
      console.log("bad email");
      console.log(err);
    } else {
      console.log("good email");
      tmplMail = ``;
    }
  });
  mailer.close();
}

const sendEmailRestablecerContraseña = async (emailData) => {
  
  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)  

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'mailAlvo', // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  mailer.sendMail({
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject: "Restablecé tu contraseña",
    template: 'tmpl_restablecer_contrasena',
    context: {
      username: destinatario.firstName,
      id: destinatario._id,
      textoEmail:"Sabemos que perdiste tu contraseña de WeRaisen. ¡Lo sentimos por eso! <br>¡Pero no te preocupes! Podes usar el siguiente link para restablecer tu contraseña http://localhost:3000/ChangePassword/"+destinatario._id
    },
    
  }, function (err, response) {
    if (err) {
      console.log("bad email");
      console.log(err);
    } else {
      console.log("good email");
      tmplMail = ``;
    }
  });
  mailer.close();
}

const sendEmailUsuarioDenegado = async (emailData) => { 

  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)
  
  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'mailAlvo', // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  mailer.sendMail({
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject: "Usuario de WER denegado",
    template: 'tmpl_usuario_denegado',
    context: {
      username: destinatario.firstName,
      id: destinatario._id,
      textoEmail:"No pudimos validar tu usuario. Había inconsistencias en los datos ingresados. Si crees que hubo un error, comunícate a weraisen.test@gmail.com"
    },
    
  }, function (err, response) {
    if (err) {
      console.log("bad email");
      console.log(err);
    } else {
      console.log("good email");
      tmplMail = ``;
    }
  });
  mailer.close();
}


const sendEmailUsuarioAprobado = async (emailData) => { 

  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)  

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'mailAlvo', // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  mailer.sendMail({
    from: "weraisen.test@gmail.com",
    to: emailData.emailDestino,
    subject: "¡Usuario de WER aprobado!",
    template: 'tmpl_usuario_aprobado',
    context: {
      username: destinatario.firstName,
      id: destinatario._id,
      textoEmail:"Tu usuario fue aprobado con éxito. Estamos felices de darte la bienvenida a nuestra comunidad. Al presionar el siguiente link ya podrás disfrutar de nuestros servicios: https://www.weraisen.com/login ¡Muchas gracias!"
    },
    
  }, function (err, response) {
    if (err) {
      console.log("bad email");
      console.log(err);
    } else {
      console.log("good email");
      tmplMail = ``;
    }
  });
  mailer.close();
}

const sendEmailEncuentro = async (emailData) => {
  console.log(emailData);
  var Turisra = await userDelegate.findUserById(emailData.match.tourist)
  var Guia = await userDelegate.findUserById(emailData.match.guide)
console.log(Turisra);

  //Datos del archivo .ics
  const event = {
    start: emailData.FechaHoraEncuentro, //[2018, 5, 30, 6, 30], //Arreglo [año, mes, dia, hora, minuto]
    duration: { hours: 2, minutes: 30 },
    title: 'Encuentro Weraisen',
    location: emailData.match.city,//'Folsom Field, University of Colorado (finish line)',//va abajo del titulo
    description: 'Encuentro WERAISEN', //nota        
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: Guia.firstName, email: Guia.email }, //Aca va el guia o el turista  
  }

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: `mailAlvo`, // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
      return
    }

    mailer.sendMail({
      from: "weraisen.test@gmail.com",
      to: Turisra.email,
      subject: "¡Tu encuentro ha sido agendado!",
      template: `tmpl_Calendar`,
      context: {
        username: Turisra.firstName,
        textoEmail:"Tu encuentro fue agendado con éxito. Haciendo click en el archivo adjunto podrás añadirlo a tu calendario personal."

      },
      icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: value
      }
    }, function (err, response) {
      if (err) {
        console.log("bad email");
        console.log(err);
      } else {
        console.log("good email");
        tmplMail = ``;
      }
    });
    mailer.close();
    sendEmailEncuentroGuia(emailData);

  })
};

const sendEmailEncuentroGuia = async (emailData) => {

  const Turisra = await userDelegate.findUserById(emailData.match.tourist)
  const Guia = await userDelegate.findUserById(emailData.match.guide)

  //Datos del archivo .ics
  const event = {
    start: emailData.FechaHoraEncuentro, //[2018, 5, 30, 6, 30], //Arreglo [año, mes, dia, hora, minuto]
    duration: { hours: 2, minutes: 30 },
    title: 'Encuentro Weraisen',
    location: emailData.match.city,//'Folsom Field, University of Colorado (finish line)',//va abajo del titulo
    description: 'Encuentro Weraisen', //nota        
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: Guia.firstName, email: Guia.email }, //Aca va el guia o el turista  
  }

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: `mailAlvo`, // name of main template
    },
    viewPath: `tmp_mails/Alvo`,
    extName: '.hbs'
  };

  mailer.use("compile", hbs(options))

  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
      return
    }

    mailer.sendMail({
      from: "weraisen.test@gmail.com",
      to: Guia.email,
      subject: "¡Tu encuentro ha sido agendado!",
      template: `tmpl_Calendar`,
      context: {
        username: Guia.firstName,
        textoEmail:"Tu encuentro fue agendado con éxito. Haciendo click en el archivo adjunto podrás añadirlo a tu calendario personal."
      },
      icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: value
      }
    }, function (err, response) {
      if (err) {
        console.log("bad email");
        console.log(err);
      } else {
        console.log("good email");
        tmplMail = ``;
      }
    });
    mailer.close();

  })
};

const updateNotificationsStatus = async (userId, status) => {
  notificationService.updateNotificationsStatus(userId, status)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  sendEmailCuentaBloqueada,
  sendEmailRestablecerContraseña,
  sendEmailUsuarioDenegado,
  sendEmailUsuarioAprobado,
  sendEmailEncuentro,
  updateNotificationsStatus,
  getUnreadNotificationsByUserId,
}
