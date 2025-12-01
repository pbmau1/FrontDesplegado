import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Ahorro } from '../../../models/Ahorro';
import { AhorroService } from '../../../services/ahorro-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/Usuario';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ahorro-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './ahorro-insert.html',
  styleUrl: './ahorro-insert.css',
  providers: [provideNativeDateAdapter()],
})
export class AhorroInsert implements OnInit {
  form!: FormGroup;
  ah: Ahorro = new Ahorro();
  edicion: boolean = false;
  id: number = 0;

  listaUsuarios: Usuario[] = [];

  hoy: Date = new Date();

  constructor(
    private aS: AhorroService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  esAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.includes('ADMIN');
  }


  validarFechas(group: AbstractControl): ValidationErrors | null {
    const inicio = group.get('fecha_inicio')?.value;
    const limite = group.get('fecha_limite')?.value;

    if (!inicio || !limite) return null;

    const i = new Date(inicio);
    const f = new Date(limite);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (f < hoy) return { fechaLimiteMenorHoy: true };
    if (f < i) return { fechaInvalida: true };

    return null;
  }


  ngOnInit(): void {
    // Crear formulario
    this.form = this.fb.group(
      {
        idAhorro: [''],
        objetivo: ['', Validators.required],
        monto_actual: ['', [Validators.required, Validators.min(0)]],
        fecha_inicio: [new Date(), Validators.required],
        fecha_limite: ['', Validators.required],
        fk: [''], // Solo visible para ADMIN
      },
      {
        validators: [this.validarFechas.bind(this)],
      }
    );

    // Cargar usuarios solo si eres admin
    if (this.esAdmin()) {
      this.uS.list().subscribe((data) => (this.listaUsuarios = data));
    }

    // Detectar edición
    this.route.params.subscribe((p: Params) => {
      this.id = p['id'];
      this.edicion = p['id'] != null;
      this.init();
    });
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idAhorro: data.idAhorro,
          objetivo: data.objetivo,
          monto_actual: data.monto_actual,
          fecha_inicio: new Date(data.fecha_inicio),
          fecha_limite: new Date(data.fecha_limite),
          fk: this.esAdmin() ? data.usuario?.idUsuario : null,
        });
      });
    }
  }


  aceptar() {
    if (!this.form.valid) return;

    this.ah.idAhorro = this.form.value.idAhorro;
    this.ah.objetivo = this.form.value.objetivo;
    this.ah.monto_actual = this.form.value.monto_actual;
    this.ah.fecha_inicio = this.form.value.fecha_inicio;
    this.ah.fecha_limite = this.form.value.fecha_limite;

    // SOLO ADMIN ENVÍA USUARIO
    if (this.esAdmin()) {
      this.ah.usuario = new Usuario();
      this.ah.usuario.idUsuario = this.form.value.fk;
    } else {
      // CLIENT NO ENVÍA USUARIO
      delete (this.ah as any).usuario;
    }


    if (this.edicion) {
      if (this.esAdmin()) {
        this.aS.updateAdmin(this.ah).subscribe(() => {
          this.refrescarLista();
          this.router.navigate(['app/ahorro']);
        });
      } else {
        this.aS.updateMiAhorro(this.ah).subscribe(() => {
          this.refrescarLista();
          this.router.navigate(['app/ahorro']);
        });
      }

      return;
    }


    this.aS.insert(this.ah).subscribe(() => {
      this.refrescarLista();
      this.router.navigate(['app/ahorro']);
    });
  }

  refrescarLista() {
    this.aS.list().subscribe((data) => this.aS.setList(data));
  }
}
