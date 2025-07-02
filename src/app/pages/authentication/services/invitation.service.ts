import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) { }

  invitation(data: object) {
    return this.http.post('http://localhost:4000/api/invitation', data);
  }

  getInvitation(id: string) {
    return this.http.get('http://localhost:4000/api/invitation/' + id);
  }
}
