import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { recursousuario } from '../../../models/recurso-usuario';
import { Recurso } from '../../../models/recurso';
import { Usuario } from '../../../models/Usuario';
import { RecursoService } from '../../../services/recurso-service';
import { UsuarioService } from '../../../services/usuario-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecursousService } from '../../../services/recursous-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recursousuario-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    NgIf,
    NgFor
  ],
  templateUrl: './recursousuario-registrar.html',
  styleUrl: './recursousuario-registrar.css'
})
export class RecursousuarioRegistrar implements OnInit {

  form!: FormGroup;
  recur: recursousuario = new recursousuario();

  edicion: boolean = false;
  id: number = 0;

  listarecurso: Recurso[] = [];
  listausuario: Usuario[] = [];

  constructor(
    private rs: RecursoService,
    private us: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rus: RecursousService
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      idRecursoUsuario: [''],
      usuario: ['', Validators.required],
      recurso: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.rs.list().subscribe(data => this.listarecurso = data);
    this.us.list().subscribe(data => this.listausuario = data);
  }

  aceptar(): void {
    if (this.form.valid) {

      this.recur = new recursousuario();
      this.recur.usuario = new Usuario();
      this.recur.recurso = new Recurso();

      this.recur.idRecursoUsuario = this.form.value.idRecursoUsuario;
      this.recur.usuario.idUsuario = this.form.value.usuario;
      this.recur.recurso.idRecurso = this.form.value.recurso;

      if (this.edicion) {
        this.rus.update(this.recur).subscribe(() => {
          this.rus.list().subscribe(data => {
            this.rus.setList(data);
          });
        });
      } else {
        this.rus.insert(this.recur).subscribe(() => {
          this.rus.list().subscribe(data => {
            this.rus.setList(data);
          });
        });
      }

      this.router.navigate(['app/recurso-usuario']);
    }
  }

  init() {
    if (this.edicion) {
      this.rus.ListId(this.id).subscribe(data => {
        this.form.patchValue({
          idRecursoUsuario: data.idRecursoUsuario,
          usuario: data.usuario.idUsuario,
          recurso: data.recurso.idRecurso
        });
      });
    }
  }
}
