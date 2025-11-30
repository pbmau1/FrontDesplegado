import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { impuestoop } from "../../../models/Impuestoop";
import { ImpuestoService } from "../../../services/impuesto-service";
import { ImpuestoopService } from "../../../services/impuestoop-service";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-impuestooperacion-list',
    imports: [MatTableModule,MatButtonModule,CommonModule,MatCardModule,MatPaginator,MatPaginatorModule,RouterLink,MatIcon],
    templateUrl: './impuestooperacion.html',
    styleUrl: './impuestooperacion.css',
})
export class ImpuestooperacionList implements OnInit{
    dataSource:MatTableDataSource<impuestoop>=new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];

    constructor(private ioS:ImpuestoopService) {}
    ngOnInit(): void {
        this.ioS.list().subscribe((data)=>{
            this.dataSource=new MatTableDataSource(data);
        });
        this.ioS.getList().subscribe((data)=>{
            this.dataSource=new MatTableDataSource(data);
        });
    }
    eliminar(id:number){
        this.ioS.delete(id).subscribe(()=>{
            this.ioS.list().subscribe((data)=>{
                this.ioS.setList(data)
            })
        })
    }
}