import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolListar } from "./rol-listar/rol-listar";

@Component({
  selector: 'app-roles',
  imports: [RouterOutlet, RolListar],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  constructor(public route:ActivatedRoute) {}

}
