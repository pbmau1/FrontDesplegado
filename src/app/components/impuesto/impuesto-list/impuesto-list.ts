import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";

import { ImpuestoService } from "../../../services/impuesto-service";
import { MatCardModule } from "@angular/material/card";
import { Impuesto } from "../../../models/Impuesto";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

@Component({
    selector:'app-impuesto-list',
    standalone:true,
    imports: [MatTableModule,MatButtonModule,MatIconModule,CommonModule,MatCardModule,MatPaginator,MatPaginatorModule,
        RouterLink,MatIcon
    ],
    templateUrl: './impuesto-list.html',
    styleUrl: './impuesto-list.css',
})
export class ImpuestoList implements OnInit{
    dataSource:MatTableDataSource<Impuesto> = new MatTableDataSource(); // Traer el modelo para el dataSource
    displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];

    constructor(private iS:ImpuestoService) {}
    ngOnInit(): void {
        this.iS.list().subscribe((data)=>{
        console.log('impuestos recibidos',data);
        this.dataSource = new MatTableDataSource(data);
    });
    this.iS.getList().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
    });
}
eliminar(id:number){
    this.iS.delete(id).subscribe(()=>{
        this.iS.list().subscribe((data)=>{
            this.iS.setList(data)
        })
    })
}}