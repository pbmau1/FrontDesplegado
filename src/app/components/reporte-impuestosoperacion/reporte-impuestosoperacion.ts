import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatSort,MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ImpuestoopService } from '../../services/impuestoop-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-reporte-impuestosoperacion',
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule],
  templateUrl: './reporte-impuestosoperacion.html',
  styleUrl: './reporte-impuestosoperacion.css',
})
export class ReporteImpuestosoperacion implements OnInit {
  displayedColumns: string[] = [
    'categoriaDeImpuesto',
    'tasa',
    'tipoIngreso',
    'categoriaDeOperacion',
    'montoOperacion',
    'montoFinal'
  ];

  dataSource = new MatTableDataSource<any>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private op:ImpuestoopService) { }

  ngOnInit(): void {
    this.op.obtenerImpuestosIngresos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;

        // activar paginator + sort
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: () => { this.loading = false; }
    });
  }

}
