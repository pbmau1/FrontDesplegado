import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Recurso } from '../models/recurso';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private url = `${environment.base}/recurso`;
  private listaCambio = new Subject<Recurso[]>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  list() {
    return this.http.get<Recurso[]>(`${this.url}/listar`);
  }

  insert(r: Recurso): Observable<string> {
    return this.http.post(`${this.url}/register`, r, { responseType: 'text' });
  }

  setList(listaNueva: Recurso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<any>(`${this.url}/listar/${id}`);
  }

  update(r: Recurso) {
    return this.http.put(`${this.url}/update`, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }

  buscarPorAutor(autor: string) {
    return this.http.get<Recurso[]>(`${this.url}/recursoporautor`, {
      params: { autor }
    });
  }

  buscarPorFecha(fecha: string) {
    return this.http.get<Recurso[]>(`${this.url}/recursoporfecha?fecha=` + fecha);
}

}
