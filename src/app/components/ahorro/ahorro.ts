import { Component } from '@angular/core';
import { AhorroList } from './ahorro-list/ahorro-list';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ahorro',
  imports: [AhorroList, RouterOutlet],
  templateUrl: './ahorro.html',
  styleUrl: './ahorro.css',
})
export class Ahorro {
  constructor(public route:ActivatedRoute){}
}


