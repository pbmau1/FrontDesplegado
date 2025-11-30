import { ROLmodel } from "./Rol" 
export class Usuario{
    idUsuario:number=0
    nombre:string=""
    correo:string=""
    contrasenia:string=""
    rol:ROLmodel[]=[]
}