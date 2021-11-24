import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
require('dotenv').config();
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository
  ) { }

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

  async IdentificarEmpleado(usuario: string, password: string) {

    let p = await this.empleadoRepository.findOne({where: {email: usuario, clave: password}});
    if (p) {
      //Si encontró al empleado generamos su token
      let token = this.CrearTokenJWT(p);
      return {
        datos :{
          nombre : p.nombres,
          correo : p.email,
          id : p.id
        },
        tk : token
      }
    } else {
      throw new HttpErrors[401]("usuario o clave erróneo.");
    }
  }

  CrearTokenJWT(empleado : Empleado){
    let claveSecreta = process.env.CLAVEJWT;
    let tk = jwt.sign({
      data : {
        id : empleado.id,
        usuario : empleado.email,
        nombre : empleado.nombres + " " + empleado.apellidos
      }
    }, claveSecreta);
    return tk;
  }

  ValidarTokenJWT(token : string){
    try {
      let datos = jwt.verify(token, process.env.CLAVEJWT);
      return datos;
    } catch {
      return false;
    }
  }
}



