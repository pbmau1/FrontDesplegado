import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecursousuarioListar } from './recursousuario-listar/recursousuario-listar';

@Component({
  selector: 'app-recursousuario',
  imports: [RouterOutlet,RecursousuarioListar],
  templateUrl: './recursousuario.html',
  styleUrl: './recursousuario.css',
})
export class Recursousuario {
  constructor(public route:ActivatedRoute) {}
}
