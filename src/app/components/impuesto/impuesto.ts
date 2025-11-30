import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ImpuestoList } from './impuesto-list/impuesto-list';


@Component({
  selector: 'app-impuesto',
  imports: [ImpuestoList,RouterOutlet],
  templateUrl: './impuesto.html',
  styleUrl: './impuesto.css',
})
export class Impuesto {
  constructor(public route:ActivatedRoute){}
}
