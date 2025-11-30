import { Component, OnInit } from '@angular/core';
import { AhorroService } from '../../services/ahorro-service';
import { UsuarioService } from '../../services/usuario-service';  // <-- el que ya usas en otros lados
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reporte-ahorro-sum',
  standalone: true,
  templateUrl: './reporte-ahorro-sum.html',
  styleUrl: './reporte-ahorro-sum.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    BaseChartDirective,
    MatCard,
    MatCardModule,
    MatIcon
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteAhorroSum implements OnInit {

  usuarios: any[] = [];
  usuarioSeleccionado: number | null = null;

  hasData = false;

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  // 👇 aquí va el truco para evitar tu error de tipos
  barChartData: any[] = [];

  constructor(
    private ahorroService: AhorroService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    console.log('[ReporteAhorroSum] ngOnInit');

    // ⭐ Usa el mismo service que usas para listar usuarios
    this.usuarioService.list().subscribe({
      next: (users) => {
        console.log('[ReporteAhorroSum] usuarios recibidos:', users);
        this.usuarios = users;
      },
      error: (err) => {
        console.error('[ReporteAhorroSum] error al cargar usuarios', err);
      }
    });
  }

  cargarAhorro() {
    if (!this.usuarioSeleccionado) {
      console.warn('No se ha seleccionado usuario');
      return;
    }

    console.log('[ReporteAhorroSum] consultando ahorro de usuario', this.usuarioSeleccionado);

    this.ahorroService.getAhorroTotal(this.usuarioSeleccionado).subscribe({
      next: (data) => {
        console.log('[ReporteAhorroSum] ahorro recibido:', data);

        if (data && data.length > 0) {
          this.hasData = true;
          this.barChartLabels = [data[0].nombre];

          this.barChartData = [
            {
              label: 'Total Ahorrado',
              data: [data[0].monto_total],
              backgroundColor: ['#4CAF50']
            }
          ];
        } else {
          this.hasData = false;
        }
      },
      error: (err) => {
        console.error('[ReporteAhorroSum] error al cargar ahorro', err);
      }
    });
  }
}
