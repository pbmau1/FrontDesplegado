import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { operacionModel } from "../../../models/operacionModel";
import { OperacionService } from "../../../services/operacion-service";
import { Usuario } from "../../../models/Usuario";
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
    CommonModule, MatDatepickerModule, MatNativeDateModule,
    MatCardContent,MatCardModule
],
  templateUrl: "./operacionregistrar.html",
  styleUrls: ["./operacionregistrar.css"]
})
export class OperacionRegistrar implements OnInit {

  form!: FormGroup;
  operacion: operacionModel = new operacionModel();
  edicion: boolean = false;
  id: number = 0;
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private operacionService: OperacionService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      idoperacion:[''],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      detalle: [''],
      fecha: [new Date(), Validators.required],
      usuarioId: ['', Validators.required]
    });

    this.usuarioService.list().subscribe(data => {
      this.usuarios = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  
categorias: string[] = [
  "Alimentación",
  "Transporte",
  "Viaje",
  "Compra en general",
  "Pago servicios",
  "Pago arbitrios",
  "Pago predial",
  "Pago patrimonio vehicular",
  "Pago alquiler",
  "Transferencias",
  "Pago de salario",
  "Honorarios profesionales",
  "Salud",
  "Educación",
  "Sueldo",
  "Bonificaciones",
  "Alquiler de propiedades",
  "Intereses",
  "Dividendos"
];

tipos: string[] = ["Ingreso", "Gasto", "Ahorro"];

minFecha = new Date();

  aceptar(): void {
    if (this.form.valid) {

      // Asegurar que exista usuario
      if (!this.operacion.usuario) {
        this.operacion.usuario = new Usuario();
      }
      this.operacion.idOperacion=this.form.value.idoperacion;
      this.operacion.categoria = this.form.value.categoria;
      this.operacion.tipo = this.form.value.tipo;
      this.operacion.monto = this.form.value.monto;
      this.operacion.detalle = this.form.value.detalle;
      this.operacion.fecha = this.form.value.fecha;
      this.operacion.usuario.idUsuario = this.form.value.usuarioId;

      if (this.edicion) {
        this.operacionService.update(this.operacion)
          .subscribe((data) => {
            this.operacionService.list().subscribe((data) => this.operacionService.setList(data));
            
          });
      } else {
        this.operacionService.insert(this.operacion)
          .subscribe((data) => {
            this.operacionService.list().subscribe((data) => this.operacionService.setList(data));
          });
      }
      this.router.navigate(['app/operacion']);
    }
  }

  cancelar(): void {
    this.router.navigate(['app/operacion']);
  }

  init() {
  if (this.edicion) {
    this.operacionService.ListId(this.id).subscribe((data) => {
      this.operacion = data;
      this.form.patchValue({
        idoperacion:(data.idOperacion),
        categoria:(data.categoria),
        tipo:(data.tipo),
        monto:(data.monto),
        detalle:(data.detalle),
        fecha: new Date(data.fecha),
        usuarioId: (data.usuario?.idUsuario)
      });

      console.log("Formulario cargado:", this.form.value);
    });
  }
}
}

