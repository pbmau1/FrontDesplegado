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
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatCard,
    MatCardModule
  ],
  templateUrl: './ahorro-list.html',
  styleUrl: './ahorro-list.css',
})
export class AhorroList implements OnInit {

  dataSource: MatTableDataSource<Ahorro> = new MatTableDataSource();

  // Columnas igual que antes, pero funcionales
  displayedColumns: string[] = [
    'c1',   // ID
    'c2',   // Objetivo
    'c3',   // Monto actual
    'c4',   // Fecha inicio
    'c5',   // Fecha límite
    'c6'    // Acciones (editar/eliminar)
  ];

  constructor(private aS: AhorroService) {}

  esAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.includes("ADMIN");
  }

  ngOnInit(): void {

    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });


    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


  eliminar(id: number) {
    const isAdmin = this.esAdmin();

    const request = isAdmin
      ? this.aS.deleteAdmin(id)
      : this.aS.deleteMiAhorro(id);

    request.subscribe(() => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
}
