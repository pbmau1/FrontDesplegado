import { Component } from "@angular/core";
import { ActivatedRoute, RouterLinkActive, RouterOutlet } from "@angular/router";
import { usuariolistar } from "./usuariolistar/usuariolistar";
import { usuarioregistrar } from "./usuarioregistrar/usuarioregistrar";

@Component({
  selector: 'app-area',
  imports: [RouterOutlet,usuarioregistrar],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
})
export class Usuario {
  constructor(public route:ActivatedRoute) {}
}