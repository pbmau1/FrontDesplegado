import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { OperacionService } from "../../../services/operacion-service";
import { operacionModel as Operacion } from "../../../models/operacionModel";

@Component({
  selector: 'app-operacion-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './operacion-list.html',
  styleUrls: ['./operacion-list.css'],
})
export class OperacionList implements OnInit {

  dataSource: MatTableDataSource<Operacion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8','c9'
  ];

  constructor(private dS: OperacionService) {}

  ngOnInit(): void {
  this.dS.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  });

  this.dS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  });
}

  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
