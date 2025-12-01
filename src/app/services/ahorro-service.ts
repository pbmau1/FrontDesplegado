import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

import { Ahorro } from '../models/Ahorro';
import { AhorroTotal } from '../models/AhorroTotal';

@Injectable({
  providedIn: 'root',
})
export class AhorroService {

  private url = `${environment.base}/ahorro`;
  private listaCambio = new Subject<Ahorro[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Ahorro[]> {
    const token = sessionStorage.getItem('token');

    if (!token) return this.http.get<Ahorro[]>(`${this.url}/me`);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = payload.roles?.includes('ADMIN');

    return isAdmin
      ? this.http.get<Ahorro[]>(`${this.url}/admin/all`)
      : this.http.get<Ahorro[]>(`${this.url}/me`);
  }


  listId(id: number): Observable<Ahorro> {
    return this.http.get<Ahorro>(`${this.url}/listar/${id}`);
  }


  insert(a: Ahorro): Observable<string> {

    const body: any = { ...a };
    if ('usuario' in body) delete body.usuario;

    return this.http.post(`${this.url}/register`, body, {
      responseType: 'text',
    });
  }


  updateMiAhorro(a: Ahorro): Observable<string> {
    return this.http.put(`${this.url}/me/${a.idAhorro}`, a, {
      responseType: 'text',
    });
  }


  updateAdmin(a: Ahorro): Observable<string> {
    return this.http.put(`${this.url}/admin/${a.idAhorro}`, a, {
      responseType: 'text',
    });
  }


  deleteMiAhorro(id: number): Observable<string> {
    return this.http.delete(`${this.url}/me/${id}`, { responseType: 'text' });
  }


  deleteAdmin(id: number): Observable<string> {
    return this.http.delete(`${this.url}/admin/${id}`, { responseType: 'text' });
  }

  getAhorrosPorPeriodo(start: string, end: string): Observable<Ahorro[]> {
    return this.http.get<Ahorro[]>(`${this.url}/periodo?start=${start}&end=${end}`);
  }


  getAhorroTotal(idUsuario: number): Observable<AhorroTotal[]> {
    return this.http.get<AhorroTotal[]>(`${this.url}/ahorrototal/${idUsuario}`);
  }


  setList(listaNueva: Ahorro[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
