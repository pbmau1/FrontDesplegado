import { Injectable, OnInit } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { impuestoop } from "../models/Impuestoop";
import { sumaimpuestosmodel } from "../models/sumimpuestoingresos";

const base_url= environment.base;

@Injectable({
    providedIn:'root',
})
export class ImpuestoopService implements OnInit{
    private url =`${base_url}/impuesto-operacion`;
    private listaCambio=new Subject<impuestoop[]>();
    constructor(private http:HttpClient){}
    ngOnInit(): void {}
    list(){
        return this.http.get<impuestoop[]>(`${this.url}/listar`);
    }
    insert(io:impuestoop):Observable<string>{
        return this.http.post(`${this.url}/register`,io,{responseType:'text'});
    }
    setList(listaNueva:impuestoop[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    ListId(id:number){
        return this.http.get<impuestoop>(`${this.url}/listar/${id}`);
    }
    update(io:impuestoop){
        return this.http.put(`${this.url}/update`,io,{responseType:'text'});
    }
    delete(id:number){
        return this.http.delete(`${this.url}/delete/${id}`,{responseType:'text'})
    }

    obtenerImpuestosIngresos(): Observable<sumaimpuestosmodel[]> {
    return this.http.get<sumaimpuestosmodel[]>(`${this.url}/obtenerimpuestos`);
  }
    
}
