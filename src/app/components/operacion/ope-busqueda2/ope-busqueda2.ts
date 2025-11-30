import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { operacionModel } from '../../../models/operacionModel';
import { OperacionService } from '../../../services/operacion-service';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ope-busqueda2',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTableModule,
    MatCard,MatCardModule
  ],
  templateUrl: './ope-busqueda2.html',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  styleUrl: './ope-busqueda2.css',
})
export class OpeBusqueda2 implements OnInit {

  form: FormGroup;
  dataSource: MatTableDataSource<operacionModel> = new MatTableDataSource();
  displayedColumns: string[] = ['idOperacion', 'nombre', 'categoria', 'montoOperacion', 'fecha'];
  mensaje: string = '';

  constructor(private fb: FormBuilder, private os: OperacionService) {
    // ❌ YA NO se inicializa con la fecha de hoy
    this.form = this.fb.group({ 
      fechabusqueda: [null] 
    });
  }

  ngOnInit(): void {
    // ▶ Se ejecutará SOLO cuando el usuario elija una fecha
    this.form.get('fechabusqueda')?.valueChanges.subscribe((fecha: Date | null) => {
      this.filtrar(fecha);
    });
  }

  filtrar(fecha: Date | string | null): void {
    if (!fecha) {
      this.dataSource.data = [];
      this.mensaje = 'Seleccione una fecha para buscar.';
      return;
    }

    let fechaStr: string;

    if (fecha instanceof Date) {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      fechaStr = `${year}-${month}-${day}`;
    } else {
      fechaStr = fecha;
    }

    this.os.buscarPorFecha(fechaStr).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<operacionModel>(data);
        this.mensaje = data.length === 0 
          ? `No se encontraron operaciones para la fecha: ${fechaStr}` 
          : '';
      },
      error: (err) => {
        this.dataSource.data = [];
        this.mensaje = err.status === 404 ? err.error : 'Error al buscar por fecha.';
      }
    });
  }
}