import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { ROLmodel } from '../models/Rol';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolServices {
  private url = `${base_url}/Rol`;
  private listaCambio = new Subject<ROLmodel[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  list() {
    return this.http.get<ROLmodel[]>(`${this.url}/listar`);
  }

  insert(r: ROLmodel): Observable<string> {
    return this.http.post(`${this.url}/register`, r, { responseType: 'text' });
  }

  setList(listaNueva: ROLmodel[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
  return this.http.get<ROLmodel>(`${this.url}/listar/${id}`);
}

  update(u: ROLmodel) {
    return this.http.put(`${this.url}/update`, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }
}
