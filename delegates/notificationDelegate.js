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
      defaultLayout: 'tmpl_cuenta_bloqueada', // name of main template
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
      id: destinatario._id
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
}

const sendEmailRestablecerContraseña = async (emailData) => {
  
  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)  

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'tmpl_restablecer_contrasena', // name of main template
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
      id: destinatario._id
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
}

const sendEmailUsuarioDenegado = async (emailData) => { 

  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)
  
  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'tmpl_usuario_denegado', // name of main template
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
      id: destinatario._id
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
}


const sendEmailUsuarioAprobado = async (emailData) => { 

  var destinatario = await userDelegate.findUserByEmail(emailData.emailDestino)  

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: 'tmpl_usuario_aprobado', // name of main template
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
      id: destinatario._id
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
    description: 'Annual 10-kilometer run in Boulder, Colorado', //nota        
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: Guia.firstName, email: Guia.email }, //Aca va el guia o el turista  
  }

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: `tmpl_Calendar`, // name of main template
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
      to: "alvoscares@gmail.com",//Turisra.email,
      subject: "Mail Ecunetro",
      template: `tmpl_Calendar`,
      context: {
        username: Turisra.firstName
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
    description: 'Annual 10-kilometer run in Boulder, Colorado', //nota        
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: Guia.firstName, email: Guia.email }, //Aca va el guia o el turista  
  }

  var options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: `tmp_mails/Alvo`, // location of handlebars templates
      defaultLayout: `tmpl_Calendar`, // name of main template
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
      to: "alvoscares@gmail.com",//Guia.email,
      subject: "Mail Ecunetro",
      template: `tmpl_Calendar`,
      context: {
        username: Guia.firstName
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
