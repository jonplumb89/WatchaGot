import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyRecipes } from './Models/MyRecipes';


@Injectable({
  providedIn: 'root'
})
export class MyrecipesService {
  apiUrl: string = "https://localhost:5001/api/MyRecipes";
  constructor(private httpClient: HttpClient) { }

  getMyRecipes() {
    return this.httpClient.get<MyRecipes[]>(this.apiUrl);
  }
}
