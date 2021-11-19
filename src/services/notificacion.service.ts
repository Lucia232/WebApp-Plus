import {injectable, /* inject, */ BindingScope} from '@loopback/core';
require('dotenv').config();


@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  Enviosms(telefonoDestino : string, contenido : string) : void {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: contenido,
        from: '+12792054053',
        to: '+57' + telefonoDestino
      })
      .then((message : any) => console.log(message.sid));
  }

}
