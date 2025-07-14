import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl +'/auth'
  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(this.baseUrl + '/register', data);
  }
  login(data: any) {
    return this.http.post(this.baseUrl+ '/login', data);
  }
  updateAndLogin(id: string, data: any) {
    return this.http.put(this.baseUrl + '/updateAndLogin/' + id, data);
  }
  checkEmail(data: any) {
    return this.http.post(this.baseUrl + '/user', data);
  }
  forgotPassword(data: any) {
    return this.http.post(this.baseUrl + '/forgotPassword', data);
  }
  resetPassword(token: string, data: any) {
    return this.http.put(this.baseUrl + '/resetPassword/' + token, data);
  }
}
