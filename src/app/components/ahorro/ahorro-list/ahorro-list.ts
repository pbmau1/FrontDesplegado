import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AhorroService } from '../../../services/ahorro-service';
import { Ahorro } from '../../../models/Ahorro';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-ahorro-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatCard,MatCardModule],
  templateUrl: './ahorro-list.html',
  styleUrl: './ahorro-list.css',
})
export class AhorroList implements OnInit {
  dataSource:MatTableDataSource<Ahorro> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c7', 'c3', 'c4', 'cF', 'c5', 'c6'];

  constructor(private aS: AhorroService) {}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.aS.delete(id).subscribe((data)=>{
      this.aS.list().subscribe((data)=>{
        this.aS.setList(data)
      })
    })

}

}



