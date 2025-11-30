import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule, MatSelect } from "@angular/material/select";
import { Balance } from "../../balance/balance";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UsuarioService } from "../../../services/usuario-service";
import { ImpuestoService } from "../../../services/impuesto-service";
import { Impuesto } from "../../../models/Impuesto";
import { Usuario } from "../../../models/Usuario";
import { MatCard, MatCardModule } from "@angular/material/card";


@Component({
    selector: 'app-impuesto-insert',
    standalone: true,
    imports: [ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    CommonModule, MatSelect,MatSelectModule,MatCard,MatCardModule],
    templateUrl: './impuesto-insert.html',
    styleUrl: './impuesto-insert.css',
})
export class ImpuestoInsert implements OnInit {
    form: FormGroup = new FormGroup({});
    imp: Impuesto = new Impuesto();
    edicion: boolean = false;
    id: number = 0;

    tipo = [
        { tipo: "1ra categoria (<= 5 UIT)", tasa: 8 },
        { tipo: "2da categoria (5-20 UIT)", tasa: 14 },
        { tipo: "4ta categoria (35-45 UIT)", tasa: 20 },
        { tipo: "5ta categoria (>45 UIT)", tasa: 30 }
    ];

    constructor(
        private iS: ImpuestoService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.route.params.subscribe((data: Params) => {
            this.id = data['id'];
            this.edicion = data['id'] != null;
            this.init();
        });
        this.form = this.formBuilder.group({
            codigo: [''],
            tipo: ['', Validators.required],
            tasa: ['', Validators.required],
        });
        this.form.get('tipo')?.valueChanges.subscribe(valor=>{
            const selecionado=this.tipo.find(x=>x.tipo===valor)
            if(selecionado){this.form.get('tasa')?.setValue(selecionado.tasa)};
        });

    }

    aceptar(): void {
        if (this.form.valid) {
            this.imp.idImpuesto = this.form.value.codigo;
            this.imp.tipo = this.form.value.tipo;
            this.imp.tasa = this.form.value.tasa;

            if (this.edicion) {
                this.iS.update(this.imp).subscribe(() => {
                    this.iS.list().subscribe((data) => {
                        this.iS.setList(data);
                    });
                });
            } else {
                this.iS.insert(this.imp).subscribe((data) => {
                    this.iS.list().subscribe((data) => {
                        this.iS.setList(data);
                    });
                });
            }
            this.router.navigate(['app/impuesto']);
        }
    }
    init() {
        console.log("Edicion:", this.edicion, "Id:", this.id);
        if (this.edicion) {
            this.iS.listId(this.id).subscribe((data) => {
                this.form = new FormGroup({
                    codigo: new FormControl(data.idImpuesto),
                    tipo: new FormControl(data.tipo),
                    tasa: new FormControl(data.tasa),
                });
            });
        }
    }
}

