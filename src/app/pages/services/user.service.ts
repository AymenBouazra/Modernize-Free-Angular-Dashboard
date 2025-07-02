import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:4000/api/user';
  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${pageSize}`);
  }
}
