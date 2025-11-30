import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso-service';
import { NumericLiteral } from 'typescript';
import { MatButtonModule } from '@angular/material/button';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-recursolistar',
  imports: [MatTableModule,MatButtonModule,MatIconModule,RouterLink,MatCardModule,MatPaginator,MatPaginatorModule],
  templateUrl: './recursolistar.html',
  styleUrl: './recursolistar.css',
})
export class Recursolistar implements OnInit{
    dataSource: MatTableDataSource<Recurso> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8','c9','c10','c11'];
    constructor(private rs: RecursoService) {}

    ngOnInit(): void {
      this.rs.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      });
      this.rs.getList().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      })
    }
    eliminar(id:number){
      this.rs.delete(id).subscribe((data)=>{
        this.rs.list().subscribe(data=>{
          this.rs.setList(data)
        })
      });
    }
}
