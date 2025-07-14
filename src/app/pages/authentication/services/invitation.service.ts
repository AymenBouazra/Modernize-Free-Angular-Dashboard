import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  baseUrl = environment.apiUrl  + '/invitation'
  constructor(private http: HttpClient) { }

  invitation(data: object) {
    return this.http.post(this.baseUrl, data);
  }

  getInvitation(id: string) {
    return this.http.get(this.baseUrl+ '/' + id);
  }
}
