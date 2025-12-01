import { Usuario } from "./Usuario";

export class operacionModel {
    idOperacion: number = 0;
    categoria: string = "";
    monto: number = 0;
    tipo: string = "";
    detalle: string = "";
    fecha: Date = new Date();
    usuario?: Usuario;   //  ← AHORA ES OPCIONAL ✔✔✔
}