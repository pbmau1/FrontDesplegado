import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recursoregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    CommonModule, MatDatepickerModule, MatSelectModule,
    MatCardModule
  ],
  templateUrl: './recursoregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './recursoregistrar.css',
})
export class Recursoregistrar implements OnInit {
  form!: FormGroup;
  rc: Recurso = new Recurso();
  edicion: boolean = false;
  id: number = 0;
  tipos = ["texto", "video", "audio", "interactivo"];
  hoy = new Date();

  constructor(
    private rs: RecursoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      idRecurso: [''],
      titulo: ['', [Validators.required, Validators.maxLength(15)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      autor: ['', [Validators.required, Validators.maxLength(15)]],
      fuente: ['', [Validators.required, Validators.maxLength(15)]],
      tipo: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]],
      fechapublicacion: ['', [Validators.required, this.fechaPublicacionValidator.bind(this)]],
      fechasubida: [{ value: new Date(), disabled: true }, Validators.required]
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  fechaPublicacionValidator(control: FormControl) {
    const fecha = new Date(control.value);
    if (fecha >= this.hoy) {
      return { fechaInvalida: true };
    }
    return null;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rc.idRecurso = this.form.value.idRecurso;
      this.rc.titulo = this.form.value.titulo
      this.rc.descripcion = this.form.value.descripcion
      this.rc.tipo = this.form.value.tipo
      this.rc.autor = this.form.value.autor
      this.rc.fuente = this.form.value.fuente
      this.rc.url = this.form.value.url
      this.rc.fechapublicacion = this.form.value.fechapublicacion
      this.rc.fechasubida = this.hoy

      if (this.edicion) {
        this.rs.update(this.rc).subscribe((data) => {
          this.rs.list().subscribe((data) =>
            this.rs.setList(data)
          );
        });
      } else {
        this.rs.insert(this.rc).subscribe((data) => {
          this.rs.list().subscribe((data) =>
            this.rs.setList(data)
          );
        });
      }

      this.router.navigate(['app/recurso']);
    }
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.rc = data;
        this.form.patchValue({
          idRecurso: (data.idRecurso),
          titulo: (data.titulo),
          descripcion: (data.descripcion),
          tipo: (data.tipo),
          autor: (data.autor),
          fuente: (data.fuente),
          url: (data.url),
          fechapublicacion: (data.fechapublicacion),
          fechasubida: new Date(data.fechasubida)
        });
      });
    }
  }
}
