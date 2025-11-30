import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsejosService {
  private apiKey = environment.newsApiKey;
  private baseUrl = environment.newsUrl;

  constructor(private http: HttpClient) {}

  getNoticiasFinancieras(): Observable<any> {
    const url = `${this.baseUrl}/everything?q=economía+finanzas+mercado+dólar&language=es&sortBy=publishedAt&pageSize=20&apiKey=${this.apiKey}`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.error('Error cargando noticias:', err);
        return throwError(() => err);
      })
    );
  }
}
