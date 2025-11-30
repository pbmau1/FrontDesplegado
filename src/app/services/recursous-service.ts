import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { recursousuario } from '../models/recurso-usuario';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecursousService implements OnInit {
  private url = `${base_url}/recurso-usuario`;
  private listaCambio = new Subject<recursousuario[]>();
  constructor(private http: HttpClient) { }
  ngOnInit(): void { }
  list() {
    return this.http.get<recursousuario[]>(`${this.url}/listar`);
  }
  insert(ru: recursousuario): Observable<string> {
    return this.http.post(`${this.url}/register`, ru, { responseType: 'text' });
  }
  setList(listaNueva: recursousuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  ListId(id: number) {
    return this.http.get<recursousuario>(`${this.url}/listar/${id}`);
  }
  update(ru: recursousuario) {
    return this.http.put(`${this.url}/update`, ru, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' })
  }
}
