import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../authentication/user.interfaces';
import {environment} from "../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl  +'/user';
  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${pageSize}`);
  }

  getUser(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: string, user: User) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
