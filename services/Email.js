const nodemailer = require ("nodemailer");

class Email{

    constructor(oConfing){
        this.createTransport = nodemailer.createTransport(oConfing);
    }

    enviarCorreo (oEmail){

        try{

            this.createTransport.sendMail(oEmail, function(error, info){
                if(error){
                    console.log("Error al enviar email.");
                }else{
                    console.log("Correo enviado correctamente");
                }

                this.createTransport.close();
            });

        }catch(x){
            console.log("Email.enviarCorreo --Error-- "+ x);
        }

    }

}
module.exports = Email;