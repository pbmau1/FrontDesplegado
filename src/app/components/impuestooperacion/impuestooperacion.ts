import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ImpuestooperacionList } from './impuestooperacion-list/impuestooperacion-list';

@Component({
  selector: 'app-impuestooperacion',
  imports: [RouterOutlet,ImpuestooperacionList],
  templateUrl: './impuestooperacion.html',
  styleUrl: './impuestooperacion.css',
})
export class Impuestooperacion {
  constructor(public route:ActivatedRoute){}
}
