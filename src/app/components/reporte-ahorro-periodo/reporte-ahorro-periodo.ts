import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorroService } from '../../services/ahorro-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reporte-ahorro-periodo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIcon,
    MatCard,
    MatCardModule
  ],
  templateUrl: './reporte-ahorro-periodo.html',
  styleUrl: './reporte-ahorro-periodo.css'
})
export class ReporteAhorroPeriodo {
  fechaInicio: string = '';
  fechaFin: string = '';
  ahorros: any[] = [];
  displayedColumns = ['id', 'objetivo', 'monto', 'fecha_inicio', 'fecha_limite', 'usuario'];

  constructor(private aS: AhorroService) {}

  buscar() {
    if (!this.fechaInicio || !this.fechaFin) return;

    this.aS.getAhorrosPorPeriodo(this.fechaInicio, this.fechaFin).subscribe(data => {
      this.ahorros = data;
      console.log('REPORTE PERIODO:', data);
    });
  }
}
