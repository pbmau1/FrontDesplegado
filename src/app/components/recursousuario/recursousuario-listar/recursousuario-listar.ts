import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { recursousuario } from '../../../models/recurso-usuario';
import { RecursousService } from '../../../services/recursous-service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recursousuario-listar',
  imports: [MatTableModule, MatButtonModule, CommonModule, MatCardModule, MatPaginator, MatPaginatorModule, RouterLink, MatIcon
  ],
  templateUrl: './recursousuario-listar.html',
  styleUrl: './recursousuario-listar.css',
})
export class RecursousuarioListar implements OnInit {
  dataSource: MatTableDataSource<recursousuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private rus: RecursousService) { }
  ngOnInit(): void {
    this.rus.list().subscribe(data => {
      this.dataSource.data = data;
    });

    this.rus.getList().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.rus.delete(id).subscribe((data) => {
      this.rus.list().subscribe((data) => {
        this.rus.setList(data)
      })
    })
  }
}
