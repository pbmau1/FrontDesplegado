import { Usuario } from "./Usuario"

export class Balance{
    idBalance:number = 0
    mes:string = ""
    anio:number =0
    total_gasto:number=0
    total_ingreso:number=0
    total_ahorro:number=0
    balance:number=0
    usuario:Usuario=new Usuario()
} 