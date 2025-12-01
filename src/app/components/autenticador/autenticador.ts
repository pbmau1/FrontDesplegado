import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-autenticador',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './autenticador.html',
  styleUrl: './autenticador.css',
})
export class Autenticador {
  correo: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    let request = new JwtRequestDTO();
    request.correo = this.correo;
    request.contrasenia = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {

        // GUARDA TOKEN CORRECTO
        sessionStorage.setItem('token', data.token);

        // GUARDA ID DEL USUARIO
        sessionStorage.setItem('idUsuario', data.idUsuario);

        // REDIRECCIONAR AL MENU
        this.router.navigate(['app']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  cerrar() {
    this.router.navigate(['']);
  }
}
