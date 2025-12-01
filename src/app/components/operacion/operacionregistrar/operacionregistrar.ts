import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { operacionModel } from "../../../models/operacionModel";
import { OperacionService } from "../../../services/operacion-service";
import { UsuarioService } from "../../../services/usuario-service";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardContent, MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-operacionregistrar",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardContent,
    MatCardModule
  ],
  templateUrl: "./operacionregistrar.html",
  styleUrls: ["./operacionregistrar.css"]
})
export class OperacionRegistrar implements OnInit {

  form!: FormGroup;
  operacion: operacionModel = new operacionModel();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private operacionService: OperacionService,
    private usuarioService: UsuarioService
  ) {}


  esAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.includes("ADMIN");
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      idOperacion: [''],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      detalle: [''],
      fecha: [new Date(), Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  categorias: string[] = [
    "Alimentación", "Transporte", "Viaje", "Compra en general",
    "Pago servicios", "Pago arbitrios", "Pago predial",
    "Pago patrimonio vehicular", "Pago alquiler", "Transferencias",
    "Pago de salario", "Honorarios profesionales", "Salud",
    "Educación", "Sueldo", "Bonificaciones", "Alquiler de propiedades",
    "Intereses", "Dividendos"
  ];

  tipos: string[] = ["Ingreso", "Gasto", "Ahorro"];

  minFecha = new Date();

  aceptar(): void {
    if (!this.form.valid) return;

    this.operacion.idOperacion = this.form.value.idOperacion;
    this.operacion.categoria = this.form.value.categoria;
    this.operacion.tipo = this.form.value.tipo;
    this.operacion.monto = this.form.value.monto;
    this.operacion.detalle = this.form.value.detalle;
    this.operacion.fecha = this.form.value.fecha;


    if (this.edicion) {

      if (this.esAdmin()) {
        this.operacionService.updateAdmin(this.operacion).subscribe(() => {
          this.recargarLista();
          this.router.navigate(['/app/operacion']);
        });

      } else {
        this.operacionService.updateMiOperacion(this.operacion).subscribe(() => {
          this.recargarLista();
          this.router.navigate(['/app/operacion']);
        });
      }

      return;
    }

    // ============================================================
    // REGISTRO NUEVO
    // ============================================================
    this.operacionService.insert(this.operacion).subscribe(() => {
      this.recargarLista();
      this.router.navigate(['/app/operacion']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/operacion']);
  }

  recargarLista() {
    this.operacionService.list().subscribe((data) => {
      this.operacionService.setList(data);
    });
  }

  init() {
    if (this.edicion) {
      
      this.operacionService.listId(this.id).subscribe((data) => {

        this.operacion = data;

        const fechaCorrecta = new Date(data.fecha + 'T00:00:00');

        this.form.patchValue({
          idOperacion: data.idOperacion,
          categoria: data.categoria,
          tipo: data.tipo,
          monto: data.monto,
          detalle: data.detalle,
          fecha: fechaCorrecta
        });
      });
    }
  }
}
