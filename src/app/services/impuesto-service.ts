import { Injectable, OnInit } from "@angular/core";
import { Impuesto } from "../models/Impuesto";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/enviroment";

const base_url= environment.base;

@Injectable({
    providedIn:'root'
})
export class ImpuestoService implements OnInit{
    private url =`${base_url}/impuestos`;
    private listaCambio = new Subject<Impuesto[]>();
    constructor(private http: HttpClient){}
    ngOnInit(): void {}

    list(){
        return this.http.get<Impuesto[]>(`${this.url}/listar`);
    }
    insert(i: Impuesto):Observable<string>{
        return this.http.post(`${this.url}/register`,i,{responseType:'text'});
    }
    setList(listaNueva: Impuesto[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Impuesto>(`${this.url}/listar/${id}`);
    }
    update(i: Impuesto){
        return this.http.put(`${this.url}/update`,i,{responseType:'text'});
    }
    delete(id:number){
        return this.http.delete(`${this.url}/delete/${id}`,{responseType:'text'})
    }
}