import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // @ts-ignore
      return tokenDecoded.sub.role;
    }
    return null;
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getName(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // @ts-ignore
      return tokenDecoded.sub.name;
    }
    return null;
  }

  getID(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // @ts-ignore
      return tokenDecoded.sub.user_id;
    }
    return null;
  }



  getEmail(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // @ts-ignore
      return tokenDecoded.sub?.email;
    }
    return null;
  }
}
