import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { operacionModel } from '../../../models/operacionModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OperacionService } from '../../../services/operacion-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-ope-busqueda1',
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCard,
    MatCardModule
  ],
  templateUrl: './ope-busqueda1.html',
  styleUrl: './ope-busqueda1.css',
  standalone: true
})
export class OpeBusqueda1 implements OnInit {
  form: FormGroup;
  dataSource: MatTableDataSource<operacionModel> = new MatTableDataSource();
  displayedColumns: string[] = ['idOperacion', 'nombre', 'categoria', 'montoOperacion', 'fecha'];
  mensaje: string = '';
  categorias: string[] = [
    "Alimentación",
    "Transporte",
    "Viaje",
    "Compra en general",
    "Pago servicios",
    "Pago arbitrios",
    "Pago predial",
    "Pago patrimonio vehicular",
    "Pago alquiler",
    "Transferencias",
    "Pago de salario",
    "Honorarios profesionales",
    "Salud",
    "Educación",
    "Sueldo",
    "Bonificaciones",
    "Alquiler de propiedades",
    "Intereses",
    "Dividendos"
  ];
  constructor(private fb: FormBuilder, private oS: OperacionService) {
    this.form = this.fb.group({ categoria: [''] });
  }

  ngOnInit(): void {
    this.form.get('categoria')?.valueChanges.subscribe((cat: string) => {
      this.filtrar(cat);
    });
  }

  filtrar(categoria: string): void {
    this.mensaje = ''; // Limpiar mensaje previo

    if (!categoria) {
      this.dataSource.data = [];
      this.mensaje = 'Ingrese una categoría para buscar.';
      return;
    }

    this.oS.findOperacionByCategoria(categoria).subscribe({
      next: (data) => {
        this.dataSource.data = data; // Asignar directamente a data
        this.mensaje = data.length === 0 ? `No se encontraron operaciones para la categoría: ${categoria}` : '';
      },
      error: (err) => {
        this.dataSource.data = [];
        this.mensaje = err.status === 404 ? err.error : 'Error al buscar por categoría.';
      }
    });
  }

}
