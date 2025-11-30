import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { operacionModel } from '../models/operacionModel';
import { operate } from 'rxjs/internal/util/lift';
import { OperacionComponent } from '../components/operacion/operacion';
import { sumaxUsuarioDTO } from '../models/sumaporusuario';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private url = `${environment.base}/operacion`;
  private listaCambio = new Subject<operacionModel[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/listar`);
  }

  insert(data: operacionModel): Observable<string> {
    return this.http.post(`${this.url}/register`, data, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  update(data: operacionModel): Observable<string> {
    return this.http.put(`${this.url}/update`, data, { responseType: 'text' });
  }

  setList(lista: operacionModel[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  ListId(id:number){
    return this.http.get<operacionModel>(`${this.url}/listar/${id}`);
  }

  findOperacionByCategoria(categoria: string): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/listarporcategoria`, {
      params: { categoria }
    });
  }

  // 🔹 Filtrar por fecha
  buscarPorFecha(fecha: string): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/busquedafecha`, {
      params: { f: fecha }
    });
  }

  getSumaOperacionesPorUsuario() {
  return this.http.get<[sumaxUsuarioDTO]>(`${this.url}/suma-por-usuario`);
}



}