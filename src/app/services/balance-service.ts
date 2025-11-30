import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Balance } from '../models/Balance';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SumaIngresosDTO } from '../models/SumaIngresosDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BalanceService implements OnInit {
  private url = `${base_url}/balance`;

  private listaCambio = new Subject<Balance[]>();

  constructor(private http: HttpClient){}

  ngOnInit(): void {}

  list() {
    return this.http.get<Balance[]>(`${this.url}/listar`);
  }

  insert(b: Balance): Observable<string> {
    return this.http.post(`${this.url}/register`, b, { responseType: 'text' });
  }

  setList(listaNueva: Balance[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Balance>(`${this.url}/listar/${id}`);
  }

  update(b: Balance) {
    return this.http.put(`${this.url}/update`, b, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`,{ responseType: 'text' })
  }

  getSumBalance(): Observable<SumaIngresosDTO[]> {
    return this.http.get<SumaIngresosDTO[]>(`${this.url}/sumadores`);
  }

  getBalancePorMes(mes: string): Observable<Balance[]> {
  return this.http.get<Balance[]>(`${this.url}/listarpormes?mes=${mes}`);
}

}
