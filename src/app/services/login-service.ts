import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequestDTO } from '../models/JwtRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(request: JwtRequestDTO) {
    return this.http.post('http://localhost:8080/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    
    let token = sessionStorage.getItem('token');
    console.log("TOKEN EN STORAGE:", token); // <-- agrega esto

    if (!token) {
    
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log("TOKEN DECODIFICADO:", decodedToken); // <-- agrega esto también

    return decodedToken?.roles; // devuelve lista o null
    
  }
  
}
