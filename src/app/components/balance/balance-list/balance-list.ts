import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BalanceService } from '../../../services/balance-service';
import { Balance } from '../../../models/Balance'; //modelo datasource
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-balance-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule,MatCardModule,MatCard],
  templateUrl: './balance-list.html',
  styleUrl: './balance-list.css',
})
export class BalanceList implements OnInit{
  dataSource:MatTableDataSource<Balance> = new MatTableDataSource(); // Traer el modelo para el dataSource

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7', 'cF', 'c8', 'c9'];

  constructor(private bS: BalanceService) {}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.bS.delete(id).subscribe((data)=>{
      this.bS.list().subscribe((data)=>{
        this.bS.setList(data)
      })
    })

}
}
