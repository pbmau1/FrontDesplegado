import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { operacionModel } from "../../../models/operacionModel";
import { ImpuestoService } from "../../../services/impuesto-service";
import { OperacionService } from "../../../services/operacion-service";
import { ImpuestoopService } from "../../../services/impuestoop-service";
import { Impuesto } from "../../../models/Impuesto";
import { impuestoop } from "../../../models/Impuestoop";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector:'app-impuestooperacion-insert',
    imports: [ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatButtonModule,
        MatSelectModule,
        CommonModule,
        MatCardModule
    ],
    templateUrl: './impuestooperacion-insert.html',
    styleUrl: './impuestooperacion-insert.css',
})
export class ImpuestooperacionInsert implements OnInit{
    form:FormGroup=new FormGroup({});
    imp:impuestoop=new impuestoop();
    edicion:boolean=false;
    id:number=0;
    listaImpuesto: Impuesto[] = [];
    listaOperacion: operacionModel[] = [];

    constructor(
        private iS:ImpuestoService,
        private oS:OperacionService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private ioS:ImpuestoopService  
    ) { }
    ngOnInit(): void {
        this.route.params.subscribe((data:Params)=>{
            this.id = data['id'];
            this.edicion = data['id'] != null;
            this.init();
        });
        this.iS.list().subscribe((data)=>{
            this.listaImpuesto = data;
        });
        this.oS.list().subscribe((data)=>{
            this.listaOperacion = data;
        });
        this.form = this.formBuilder.group({
            codigo:[''],
            impuesto:['',Validators.required],
            operacion:['',Validators.required],
        });
    }
    aceptar():void{
        if(this.form.valid){
            this.imp.idImpuestoOperacion = this.form.value.codigo;
            this.imp.impuesto.idImpuesto = this.form.value.impuesto;
            this.imp.operacion.idOperacion= this.form.value.operacion;
            
            if(this.edicion){
                this.ioS.update(this.imp).subscribe(()=>{
                    this.ioS.list().subscribe((data)=>{
                        this.ioS.setList(data);
                    });
            });
            }else{
                this.ioS.insert(this.imp).subscribe((data)=>{
                    this.ioS.list().subscribe((data)=>{
                        this.ioS.setList(data);
                    });
                });
        }   
        this.router.navigate(['app/impuesto-operacion']);
    }
}

    init(){
        if(this.edicion){
            this.ioS.ListId(this.id).subscribe((data)=>{
                this.form=new FormGroup({
                    codigo:new FormControl(data.idImpuestoOperacion),
                    impuesto:new FormControl(data.impuesto.idImpuesto),
                    operacion:new FormControl(data.operacion.idOperacion),
                });
            });
        }
    }

}
    

    
