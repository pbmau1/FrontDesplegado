import { Usuario } from './Usuario';

export class Ahorro {
  idAhorro: number = 0;
  objetivo: string = '';
  monto_actual: number = 0;
  fecha_inicio: Date = new Date();
  fecha_limite: Date = new Date();
  usuario: Usuario = new Usuario();
}

