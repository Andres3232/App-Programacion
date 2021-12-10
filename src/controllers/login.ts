import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import bcryptjs from 'bcryptjs'
import { generarJWT } from "../helpers/generJWT";
import { userService } from '../services/usuarioService';
import  { LocalStorage } from 'node-localstorage';



const localStorage = new LocalStorage('./scratch');


export const login = async(req, res,) => {

    const { username, password } = req.body;
  
    const usersRepository = getCustomRepository(UsersRepository);

    try {
        // Verificar si el usuario existe
        const usuario = await usersRepository.findOne({username})
        
        if ( !usuario ) {
            return res.render("Incorrecto");
        }
        // Verificar la contraseña
        let passwordString = password.toString()
        
        const validPassword = bcryptjs.compareSync( passwordString, usuario.Password );
        
        if ( !validPassword ) {
            return res.render("Incorrecto");
            ;
        }

        // Generar el JWT
        const token:any = await generarJWT( usuario.id );
        
       //guardarlo en el local starage
        localStorage.setItem('x-token',JSON.stringify(token))
        
        const users = await userService.list();
        const options = {
          year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric',
          hour12: true, 
        };
        users.map(user=>{
          //@ts-ignore
          user.fecha = new Intl.DateTimeFormat(options).format(user.fecha);

        })
    
        return res.render("index", {
            usuario,
            token,
            users
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   
}


export  const signup = async(request,response) => {
    let { username, email, Telefono, Ciudad, Estado, Password,fecha } = request.body;
    Telefono = parseInt(Telefono)
    const Rol= "User"

    const salt = bcryptjs.genSaltSync();
   
    Password = bcryptjs.hashSync( Password, salt );

    try {
        await userService.create({
          username,
          email,
          Telefono,
          Ciudad,
          Estado,
          Rol,
          Password,
          fecha
        }).then(() => {
          response.render("messageSignup", {
            message: "Usuario creado con exito"
          });
        });
      } catch (err) {
        response.render("messageSignup", {
          message: `Error al crear el usuario: ${err.message}`
        });
      }
}