import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {
  baseUrl = environment.apiUrl  +'/business-units';
  constructor(private http: HttpClient) { }

  getBusinessUnits(page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${pageSize}`);
  }

  getBusinessUnit(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBusinessUnit(businessUnit: any) {
    return this.http.post(`${this.baseUrl}`, businessUnit);
  }

  updateBusinessUnit(id: string, businessUnit: any) {
    return this.http.put(`${this.baseUrl}/${id}`, businessUnit);
  }

  deleteBusinessUnit(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
