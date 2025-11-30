import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { OperacionList } from "./operacion-listar/operacion-list";

@Component({
  selector: 'app-operacion',
  imports: [RouterOutlet, OperacionList],
  templateUrl: './operacion.html',
  styleUrl: './operacion.css',
})
export class OperacionComponent {
  constructor(public route: ActivatedRoute) {}
}
