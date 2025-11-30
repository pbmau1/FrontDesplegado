import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ROLmodel } from '../../../models/Rol';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolServices } from '../../../services/rol-services';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/Usuario';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rol-registrar',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule, MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './rol-registrar.html',
  styleUrl: './rol-registrar.css',
})
export class RolRegistrar implements OnInit {

  form!: FormGroup;
  rol: ROLmodel = new ROLmodel();
  edicion: boolean = false;
  id: number = 0;
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rols: RolServices,
    private us: UsuarioService
  ) { }
  roles: string[] = ['ADMIN', 'CLIENT'];
  ngOnInit(): void {

    this.form = this.fb.group({
      idrol: [''],
      rol: ['', Validators.required],
      usuarioId: ['', Validators.required]
    });

    this.us.list().subscribe(data => {
      this.usuarios = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  aceptar(): void {
    if (this.form.valid) {


      this.rol.id = this.form.value.idrol;
      this.rol.rol = this.form.value.rol;
      this.rol.idUsuario = this.form.value.usuarioId;
      if (this.edicion) {
        this.rols.update(this.rol)
          .subscribe((data) => {
            this.rols.list().subscribe((data) => this.rols.setList(data));
            this.router.navigate(['app/roles']);
          });
      } else {
        this.rols.insert(this.rol)
          .subscribe((data) => {
            this.rols.list().subscribe((data) => this.rols.setList(data));
            this.router.navigate(['app/roles']);
          });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.rols.listId(this.id).subscribe((data) => {
        this.rol = data;

        this.form.patchValue({
          idrol: data.id,
          rol: data.rol,
          usuarioId: data.idUsuario,
        });

        console.log("Formulario cargado:", this.form.value);
      });
    }
  }
}
