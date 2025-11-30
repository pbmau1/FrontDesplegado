import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuarioregistrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './usuarioregistrar.html',
  styleUrls: ['./usuarioregistrar.css'],
})
export class usuarioregistrar implements OnInit {

  form: FormGroup = new FormGroup({});
  ur: Usuario = new Usuario();
  mensajeError: string = '';
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Inicializar formulario
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(10)]],
    });

    // ============================
    // 🔵 Caso PERFIL DEL USUARIO
    // ============================
    if (this.router.url === '/app/perfil') {
      
      this.edicion = true;

      // Obtener correo desde token (como ya lo haces en LoginService)
      const token = sessionStorage.getItem('token');
      const correo = JSON.parse(atob(token!.split('.')[1])).sub;

      // Buscar el usuario con ese correo
      this.uS.list().subscribe(usuarios => {
        const encontrado = usuarios.find(u => u.correo === correo);

        if (encontrado) {
          this.id = encontrado.idUsuario;
          this.cargarUsuarioPorId(this.id);
        }
      });

      return;
    }

    // ============================
    // 🔵 Caso EDITAR ADMIN (Ya funcionaba)
    // ============================
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;

      if (this.edicion) {
        this.cargarUsuarioPorId(this.id);
      }
    });

  }

  cargarUsuarioPorId(id: number) {
    this.uS.listId(id).subscribe(data => {
      this.ur = data;

      this.form.patchValue({
        codigo: data.idUsuario,
        nombre: data.nombre,
        correo: data.correo
      });

      // No pedir contraseña en edición
      this.form.get('contrasenia')?.clearValidators();
      this.form.get('contrasenia')?.updateValueAndValidity();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ur.idUsuario = this.form.value.codigo;
      this.ur.nombre = this.form.value.nombre;
      this.ur.correo = this.form.value.correo;
      this.ur.contrasenia = this.form.value.contrasenia;

      // EDICIÓN
      if (this.edicion) {
        this.uS.update(this.ur).subscribe(() => {
          this.router.navigate(['/app']);
        });
        return;
      }

      // REGISTRO
      this.uS.insert(this.ur).subscribe({
        next: () => this.router.navigate(['login']),
        error: (error) => {
          if (error.status === 409 || error.status === 400) {
            this.mensajeError = ' El correo ya se encuentra registrado.';
          } else {
            this.mensajeError = ' Error al registrar usuario.';
          }
        },
      });
    }
  }

  cerrar() {
    this.router.navigate(['']);
  }
}