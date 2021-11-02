import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AspNetUser } from './Models/Users';

@Injectable({
  providedIn: 'root'
})
export class AspNetUserService {

  apiUrl: string = "https://localhost:5001/api/AspNetUser";
  constructor(private httpClient: HttpClient) { }

  GetUser() {
    return this.httpClient.get<AspNetUser[]>(this.apiUrl);
  }
}
