import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoginService } from "../../services/login-service";
import { ConsejosService } from "../../services/consejos-service";
import { MatDividerModule } from '@angular/material/divider'; 

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink, RouterOutlet,MatDividerModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string[] = [];
  usuario: string = '';
  recomendaciones: any;

  constructor(
  private loginService: LoginService,
  private consejosService: ConsejosService
) {}

  ngOnInit() {
    this.role = this.loginService.showRole();
    console.log("ROL INICIAL:", this.role);
  }

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    console.log("ROL ACTUAL:", this.role);

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role?.includes('ADMIN');
  }

  isClient() {
    return this.role?.includes('CLIENT');
  }
}