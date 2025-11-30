import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BalanceService } from '../../services/balance-service';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reportebalance-sum',
  imports: [MatIconModule, BaseChartDirective,MatCard,MatCardModule],
  templateUrl: './reportebalance-sum.html',
  styleUrl: './reportebalance-sum.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReportebalanceSum implements OnInit {

  hasData = false

  barChartOptions:ChartOptions={
    responsive:true
  }

  barChartLabels:string[]=[]
  barChartType:ChartType='bar'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private bs: BalanceService) { }

  ngOnInit(): void {
    this.bs.getSumBalance().subscribe((data=>{
      if(data.length>0){
        this.hasData=true;
        this.barChartLabels = data.map((item) => item.nombre);
        this.barChartData = [{
          data:data.map(item=>item.total_ingreso),
          label: 'Suma de Ingresos por usuario',
          backgroundColor:['#59EB73']
        }
        ]
      }
    }
    ))
  }
}
