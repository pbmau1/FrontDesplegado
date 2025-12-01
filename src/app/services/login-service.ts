import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequestDTO } from '../models/JwtRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  // LOGIN llama al backend
  login(request: JwtRequestDTO) {
    return this.http.post(this.apiUrl, request);
  }

  // Verifica si hay token
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) return [];

    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    let roles = decoded?.roles;

    if (!roles) return [];

    if (typeof roles === 'string') {
      return [roles];
    }

    if (Array.isArray(roles) && typeof roles[0] === 'string') {
      return roles;
    }

    if (Array.isArray(roles)) {
      return roles.map((r: any) => r.rol || r.authority || r.name || r.nombre || r.role || r);
    }

    return [];
  }
}
