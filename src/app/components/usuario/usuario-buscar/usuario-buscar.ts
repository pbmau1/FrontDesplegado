import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-usuario-buscar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCard,
    MatCardModule
  ],
  templateUrl: './usuario-buscar.html',
  styleUrls: ['./usuario-buscar.css'],
})
export class UsuarioBuscarComponent implements OnInit {

  idBuscado: number | null = null;
  mensaje: string = '';

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = ['idUsuario', 'nombre', 'correo'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  buscarPorId() {
    if (!this.idBuscado) {
      this.mensaje = 'Ingrese un ID válido.';
      this.dataSource = new MatTableDataSource<Usuario>([]);
      return;
    }

    this.usuarioService.listId(this.idBuscado).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Usuario>([data]);
        this.mensaje = '';
      },
      error: () => {
        this.mensaje = 'Usuario no encontrado.';
        this.dataSource = new MatTableDataSource<Usuario>([]);
      }
    });
  }

  limpiarBusqueda() {
    this.idBuscado = null;
    this.mensaje = '';
    this.dataSource = new MatTableDataSource<Usuario>([]);
  }
}
