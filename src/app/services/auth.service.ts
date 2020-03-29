import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthUser, User } from '../models/User';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/AuthToken';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  login(authUser: AuthUser): Observable<any> {
    return this.http.put(`${this.baseURL}/login`, authUser, httpOptions);
  }

  logout() {
    localStorage.removeItem('idItem');
    localStorage.removeItem('expiresOn')
  }

  setSession(token: AuthToken) {
    localStorage.setItem('idItem', token.idToken);
    localStorage.setItem('expiresOn', token.expiresOn.toString());
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getTokenExpiration());
  }

  getTokenExpiration() {
    const expiresOn = Number.parseInt(localStorage.getItem('expiresOn'));

    return moment.unix(expiresOn);
  }
}
