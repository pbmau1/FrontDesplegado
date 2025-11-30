import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Balance } from '../../../models/Balance';
import { BalanceService } from '../../../services/balance-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-balance-insert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,CommonModule,MatCardModule],
  templateUrl: './balance-insert.html',
  styleUrl: './balance-insert.css',
})
export class BalanceInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  bal: Balance = new Balance();
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Usuario[] = [];

  meses: { value: string; viewValue: string }[] = [
    { value: 'Enero', viewValue: 'Enero' },
    { value: 'Febrero', viewValue: 'Febrero' },
    { value: 'Marzo', viewValue: 'Marzo' },
    { value: 'Abril', viewValue: 'Abril' },
    { value: 'Mayo', viewValue: 'Mayo' },
    { value: 'Junio', viewValue: 'Junio' },
    { value: 'Julio', viewValue: 'Julio' },
    { value: 'Agosto', viewValue: 'Agosto' },
    { value: 'Septiembre', viewValue: 'Septiembre' },
    { value: 'Octubre', viewValue: 'Octubre' },
    { value: 'Noviembre', viewValue: 'Noviembre' },
    { value: 'Diciembre', viewValue: 'Diciembre' }
  ];
  constructor(
    private bS: BalanceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {
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

    this.form = this.formBuilder.group({
      codigo: [''],
      mes: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(2025), Validators.maxLength(4)]],
      fk: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.bal.idBalance = this.form.value.codigo;
      this.bal.mes = this.form.value.mes;
      this.bal.anio = this.form.value.anio;
      this.bal.usuario.idUsuario = this.form.value.fk;

      if (this.edicion) {
        this.bS.update(this.bal).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      } else {
        this.bS.insert(this.bal).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      }

      this.router.navigate(['app/balance']);
    }

  }


  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo:(data.idBalance),
          mes: (data.mes),
          anio: (data.anio),
          fk:(data.usuario.idUsuario)
        });

      });
    }
  }
}