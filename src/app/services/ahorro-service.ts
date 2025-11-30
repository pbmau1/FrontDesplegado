import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ahorro } from '../models/Ahorro';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Usuario } from '../models/Usuario';
import { AhorroTotal } from '../models/AhorroTotal';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AhorroService implements OnInit {
  private url = `${base_url}/ahorro`;

  private listaCambio = new Subject<Ahorro[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Ahorro[]>(`${this.url}/listar`);
  }

  insert(a: Ahorro): Observable<string> {
    return this.http.post(`${this.url}/register`, a, { responseType: 'text' });
  }

  setList(listaNueva: Ahorro[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Ahorro>(`${this.url}/listar/${id}`);
  }

  update(a: Ahorro) {
    return this.http.put(`${this.url}/update`, a, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }

  getAhorroTotal(idUsuario: number): Observable<AhorroTotal[]> {
    return this.http.get<AhorroTotal[]>(`${this.url}/ahorrototal/${idUsuario}`);
  }

  getAhorrosPorPeriodo(start: string, end: string): Observable<Ahorro[]> {
    return this.http.get<Ahorro[]>(`${this.url}/periodo?start=${start}&end=${end}`);
  }
}
