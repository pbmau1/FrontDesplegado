import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { OperacionService } from '../../../services/operacion-service';
import { operacionModel as Operacion } from '../../../models/operacionModel';

@Component({
  selector: 'app-operacion-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './operacion-list.html',
  styleUrls: ['./operacion-list.css'],
})
export class OperacionList implements OnInit {
  dataSource: MatTableDataSource<Operacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  constructor(private dS: OperacionService) {}

  esAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.includes('ADMIN');
  }

  ngOnInit(): void {
    // 🔵 CARGA SEGÚN ROL (admin/me)
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    // 🔵 LISTA REACTIVA
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = payload.roles?.includes('ADMIN');

    const request = isAdmin ? this.dS.deleteAdmin(id) : this.dS.deleteMiOperacion(id);

    request.subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
