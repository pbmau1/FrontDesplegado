import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
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
import { MatCard, MatCardModule } from '@angular/material/card';

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
    MatSelectModule,MatCardModule,
    MatCard
  ],
  templateUrl: './ahorro-insert.html',
  styleUrl: './ahorro-insert.css',
  providers:[provideNativeDateAdapter()]
})
export class AhorroInsert {
  form: FormGroup = new FormGroup({});
  ah: Ahorro = new Ahorro();
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Usuario[] = [];

  hoy:Date=new Date();

  constructor(
    private aS: AhorroService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  validarFechas(control: AbstractControl): ValidationErrors | null {
  const form = control as FormGroup;

  const inicio = form.get('fecha_inicio')?.value;
  const fin = form.get('fecha_limite')?.value;

  if (!inicio || !fin) return null;

  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);
  const hoy=new Date();
  hoy.setHours(0,0,0,0);

  if(fechaFin<hoy){
    return{fechaLimiteMenorHoy:true};
  }
  if(fechaFin<fechaInicio){
    return {fechaInvalida:true};
  }
  return null;
}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });

    this.form = this.formBuilder.nonNullable.group(
  {
    codigo: [''],
    objetivo: ['', Validators.required],
    monto_actual: ['', [Validators.required, Validators.min(0)]],
    fecha_inicio: [new Date().toISOString().substring(0,10),Validators.required],
    fecha_limite: ['', Validators.required],
    fk: ['', Validators.required]
  },
  {
    validators: [this.validarFechas.bind(this)]
  }
);


    this.init();
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ah.idAhorro = this.form.value.codigo;
      this.ah.objetivo = this.form.value.objetivo;
      this.ah.monto_actual=this.form.value.monto_actual;
      this.ah.usuario = new Usuario();
      this.ah.usuario.idUsuario = this.form.value.fk;
      this.ah.fecha_inicio = this.form.value.fecha_inicio;
      this.ah.fecha_limite = this.form.value.fecha_limite;

      if (this.edicion) {
        this.aS.update(this.ah).subscribe(() => {
          this.aS.list().subscribe((data) => this.aS.setList(data));
        });
      } else {
        this.aS.insert(this.ah).subscribe(() => {
          this.aS.list().subscribe((data) => this.aS.setList(data));
        });
      }

      this.router.navigate(['app/ahorro']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idAhorro,
          objetivo:  (data.objetivo),
          monto_actual:(data.monto_actual),
          fecha_inicio: (data.fecha_inicio),
          fecha_limite: (data.fecha_limite),
          fk: (data.usuario.idUsuario),
        });
      });
    }
  }
}
