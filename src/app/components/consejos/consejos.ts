import { Component, OnInit } from '@angular/core';
import { ConsejosService } from '../../services/consejos-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-consejos',
  imports: [CommonModule, MatCardModule],
  templateUrl: './consejos.html',
  styleUrl: './consejos.css',
})
export class Consejos implements OnInit {
  constructor(private consejosService: ConsejosService) {}

  noticias: any[] = [];
  cargando = true;

  ngOnInit(): void {
    this.consejosService.getNoticiasFinancieras().subscribe({
      next: (data: any) => {
        this.noticias = data.articles; // NewsAPI devuelve "articles"
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }
}
