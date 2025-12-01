import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements OnInit {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }

  insert(a: Usuario): Observable<any> {
    return this.http.post(`${this.url}/register`, a, { responseType: 'text' });
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/listar/${id}`);
  }

  //  ADMIN / CLIENT  actualizar usuario cualquiera (requiere ID)
  update(id: number, usuario: Usuario) {
    return this.http.put(`${this.url}/update/${id}`, usuario, { responseType: 'text' });
  }

  // ADMIN / CLIENT  eliminar usuario cualquiera (requiere ID)
  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }

  //  CLIENT  obtener su usuario del token
  getMiUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/me`);
  }

  //  CLIENT  actualizar su propio usuario
  updateMiUsuario(usuario: Usuario) {
    return this.http.put(`${this.url}/me`, usuario, { responseType: 'text' });
  }
}
