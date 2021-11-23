import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
require('dotenv').config();

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(10, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

}
