import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Balance } from '../../models/Balance';
import { BalanceService } from '../../services/balance-service';
import { MatSelectModule } from '@angular/material/select';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte-balance-mes',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    BaseChartDirective],
  templateUrl: './reporte-balance-mes.html',
  styleUrl: './reporte-balance-mes.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteBalanceMes implements OnInit {


  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];


  mesBuscado: string = '';
  mensaje: string = '';

  dataSource: MatTableDataSource<Balance> =
    new MatTableDataSource<Balance>([]);

  displayedColumns: string[] = [
    'mes',
    'anio',
    'total_gasto',
    'total_ingreso',
    'total_ahorro',
    'balance',
    'usuario'
  ];

  constructor(private bs: BalanceService) { }

  hasData = false
  
    barChartOptions:ChartOptions={
      responsive:true
    }
  
    barChartLabels:string[]=['Total Ingreso', 'Total Gasto', 'Total Ahorro']
    barChartType:ChartType='pie'
    barChartLegend=true
    barChartData:ChartDataset[]=[]



  ngOnInit(): void {
  }

  buscarPorMes() {
    if (!this.mesBuscado) {
      this.mensaje = 'Debe seleccionar un mes.';
      this.dataSource = new MatTableDataSource<Balance>([]);
      return;
    }

        this.bs.getBalancePorMes(this.mesBuscado).subscribe((data=>{
      if(data.length>0){
        this.hasData=true;
        this.barChartData = [{
          data: [data[0].total_ingreso, data[0].total_gasto, data[0].total_ahorro],
          label: 'Balance del Mes',
          backgroundColor:['#59EB73', '#AD95FC', '#ED517B']
        }
        ]
      }
    }
    ));

    this.bs.getBalancePorMes(this.mesBuscado).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.mensaje = '';
      },
      error: () => {
        this.mensaje = `No se encontraron balances para el mes "${this.mesBuscado}".`;
        this.dataSource = new MatTableDataSource<Balance>([]);
      }
    });
  }

  limpiar() {
    this.mesBuscado = '';
    this.mensaje = '';
    this.dataSource = new MatTableDataSource<Balance>([]);
  }
}
