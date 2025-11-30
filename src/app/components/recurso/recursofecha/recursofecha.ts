import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RecursoService } from '../../../services/recurso-service';
import { Recurso } from '../../../models/recurso';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-recursobuscarfecha',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule
    ],
    providers: [],
    templateUrl: './recursofecha.html',
    styleUrls: ['./recursofecha.css']
})
export class Recursobuscarfecha {

    form: FormGroup;
    mensaje = '';
    dataSource = new MatTableDataSource<Recurso>();

    displayedColumns = [
        'titulo',
        'autor',
        'fechapublicacion',
        'tipo',
        'fuente'
    ];

    constructor(private fb: FormBuilder, private rS: RecursoService) {
        this.form = this.fb.group({
            fecha: ['']
        });
    }

    buscar() {
        const fecha = this.form.value.fecha;

        if (!fecha) {
            this.mensaje = 'Seleccione una fecha.';
            this.dataSource.data = [];
            return;
        }

        console.log("Fecha original:", fecha);

        const fechaISO = new Date(fecha).toISOString().split("T")[0];
        console.log("Fecha enviada al backend:", fechaISO);

        this.rS.buscarPorFecha(fechaISO).subscribe({
            next: data => {
                this.dataSource.data = data;
                this.mensaje = data.length === 0
                    ? 'No se encontraron recursos para esa fecha.'
                    : '';
            },
            error: err => {
                this.mensaje = err.status === 404 ? err.error : 'Error al buscar.';
                this.dataSource.data = [];
            }
        });
    }
}
