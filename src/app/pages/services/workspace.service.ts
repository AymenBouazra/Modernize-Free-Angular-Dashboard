import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  baseUrl = environment.apiUrl  +'/workspace';
  constructor(private http: HttpClient) { }

  getWorkspaces(page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${pageSize}`);
  }

  getWorkspace(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createWorkspace(workspace: any) {
    return this.http.post(`${this.baseUrl}`, workspace);
  }

  updateWorkspace(id: string, workspace: any) {
    return this.http.put(`${this.baseUrl}/${id}`, workspace);
  }

  deleteWorkspace(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
