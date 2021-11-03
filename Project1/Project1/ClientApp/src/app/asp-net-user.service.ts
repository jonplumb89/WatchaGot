import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AspNetUser } from './Models/Users';

@Injectable({
  providedIn: 'root'
})
export class AspNetUserService {

  apiUrl: string = "https://localhost:5001/api/AspNetUsers";
  constructor(private httpClient: HttpClient) { }

  getAspNetUsers() {
    return this.httpClient.get<AspNetUser[]>(this.apiUrl);
  }
}
