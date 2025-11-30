import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecursoService } from '../../../services/recurso-service';
import { Recurso } from '../../../models/recurso';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-recursobuscarautor',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    templateUrl: './recursoautor.html',
    styleUrls: ['./recursoautor.css']
})
export class Recursobuscarautor {

    form: FormGroup;
    mensaje = '';
    dataSource = new MatTableDataSource<Recurso>();

    displayedColumns = [
        'titulo',
        'descripcion',
        'tipo',
        'autor',
        'fuente',
        'fechapublicacion'
    ];

    constructor(private fb: FormBuilder, private rS: RecursoService) {
        this.form = this.fb.group({
            autor: ['']
        });
    }

    buscar() {
        const autor = this.form.value.autor;

        if (!autor || autor.trim() === '') {
            this.mensaje = 'Ingrese un autor.';
            this.dataSource.data = [];
            return;
        }

        this.rS.buscarPorAutor(autor).subscribe({
            next: data => {
                this.dataSource.data = data;
                this.mensaje = data.length === 0
                    ? 'No se encontraron resultados.'
                    : '';
            },
            error: err => {
                this.mensaje = err.status === 404 ? err.error : 'Error al buscar.';
                this.dataSource.data = [];
            }
        });
    }
}
