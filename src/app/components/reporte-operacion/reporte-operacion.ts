import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { OperacionService } from '../../services/operacion-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reporte-operacion',
  imports: [BaseChartDirective, MatIconModule,MatCardModule],
  templateUrl: './reporte-operacion.html',
  styleUrl: './reporte-operacion.css',
  providers: [provideCharts(withDefaultRegisterables())],   
})
export class ReporteOperacion {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private opService: OperacionService) {}

  ngOnInit(): void {
    this.opService.getSumaOperacionesPorUsuario().subscribe((data) => {

      if (data.length > 0) {
        this.hasData = true;

        // Etiquetas con los nombres de usuario
        this.barChartLabels = data.map(item => item.nombre);

        // Datasets: ingresos y gastos
        this.barChartData = [
          {
            data: data.map(item => item.totalIngresos),
            label: 'Total Ingresos',
            backgroundColor: 'rgba(26, 115, 232, 0.3)',
            borderColor: '#1a73e8',
            fill: true
          },
          {
            data: data.map(item => item.totalGastos),
            label: 'Total Gastos',
            backgroundColor: 'rgba(217, 48, 37, 0.3)',
            borderColor: '#d93025',
            fill: true
          }
        ];

      } else {
        this.hasData = false;
      }

    });
  }
}
