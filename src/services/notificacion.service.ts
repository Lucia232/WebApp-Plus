import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Empleado} from '../models';
require('dotenv').config();
const nodemailer = require("nodemailer");


@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  Enviosms(telefonoDestino: string, contenido: string): void {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: contenido,
        from: '+12792054053',
        to: '+57' + telefonoDestino
      })
      .then((message: any) => console.log(message.sid));
  }

  async Enviarcorreo(correo_destino: string, empleado: Empleado, clave: string) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"WebApp+Plus 👻" <aplicacion.empresas@gmail.com>', // sender address
      to: correo_destino, // list of receivers
      subject: "Registro y Bienvenida", // Subject line
      //text: `Hola ${empleado.nombres}, bienvenido a la empresa`, // plain text body
      html: `Hola ${empleado.nombres}, bienvenido a WebApp+Plus, una aplicación para gestionar su información, su usuario es: ${empleado.email} y su contraseña: ${clave}`,
    });
  }

}
