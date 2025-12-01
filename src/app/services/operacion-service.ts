import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { operacionModel } from '../models/operacionModel';
import { sumaxUsuarioDTO } from '../models/sumaporusuario';

@Injectable({
  providedIn: 'root',
})
export class OperacionService {
  private url = `${environment.base}/operacion`;
  private listaCambio = new Subject<operacionModel[]>();

  constructor(private http: HttpClient) {}

  // LISTAR (admin o client)
  list(): Observable<operacionModel[]> {
    const token = sessionStorage.getItem('token');

    if (!token) return this.http.get<operacionModel[]>(`${this.url}/me`);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = payload.roles?.includes('ADMIN');

    return isAdmin
      ? this.http.get<operacionModel[]>(`${this.url}/admin/all`)
      : this.http.get<operacionModel[]>(`${this.url}/me`);
  }

  // LISTAR POR ID
  listId(id: number): Observable<operacionModel> {
    return this.http.get<operacionModel>(`${this.url}/listar/${id}`);
  }

  // INSERTAR
  insert(op: operacionModel): Observable<string> {
    const body: any = { ...op };
    if ('usuario' in body) delete body.usuario;

    return this.http.post(`${this.url}/register`, body, { responseType: 'text' });
  }

  // UPDATE (CLIENT)
  updateMiOperacion(op: operacionModel): Observable<string> {
    return this.http.put(`${this.url}/me/${op.idOperacion}`, op, { responseType: 'text' });
  }

  // UPDATE (ADMIN)
  updateAdmin(op: operacionModel): Observable<string> {
    return this.http.put(`${this.url}/admin/${op.idOperacion}`, op, { responseType: 'text' });
  }

  // DELETE (CLIENT)
  deleteMiOperacion(id: number): Observable<string> {
    return this.http.delete(`${this.url}/me/${id}`, { responseType: 'text' });
  }

  // DELETE (ADMIN)
  deleteAdmin(id: number): Observable<string> {
    return this.http.delete(`${this.url}/admin/${id}`, { responseType: 'text' });
  }



  findOperacionByCategoria(categoria: string): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/listarporcategoria`, {
      params: { categoria },
    });
  }

  buscarPorFecha(fecha: string): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/busquedafecha`, {
      params: { f: fecha },
    });
  }

  getSumaOperacionesPorUsuario(): Observable<sumaxUsuarioDTO[]> {
    return this.http.get<sumaxUsuarioDTO[]>(`${this.url}/suma-por-usuario`);
  }

  // LISTA REACTIVA
  setList(lista: operacionModel[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
