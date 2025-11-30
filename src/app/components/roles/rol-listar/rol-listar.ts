import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ROLmodel } from '../../../models/Rol';
import { RolServices } from '../../../services/rol-services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-rol-listar',
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,MatPaginator,MatPaginatorModule],
  templateUrl: './rol-listar.html',
  styleUrl: './rol-listar.css',
})
export class RolListar implements OnInit{
 dataSource: MatTableDataSource<ROLmodel> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5'
  ];

  constructor(private rs: RolServices) {}

  ngOnInit(): void {
  this.rs.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    console.log('Datos recibidos del backend:', data); // <-- Aquí
  });

  this.rs.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
      console.log('Datos recibidos del getList:', data); // <-- Opcional
  });
}

  eliminar(id: number) {
    this.rs.delete(id).subscribe((data) => {
      this.rs.list().subscribe((data) => {
        this.rs.setList(data);
      });
    });
  }
}
