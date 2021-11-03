import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { MyRecipes } from './Models/MyRecipes';

@Injectable({
  providedIn: 'root'
})
export class MyrecipesService {

  name: string;

  apiUrl: string = "https://localhost:5001/api/MyRecipes/";
  constructor(private httpClient: HttpClient, private authorizeService: AuthorizeService) { }

  getMyRecipes() {
    return this.httpClient.get<MyRecipes[]>(this.apiUrl);
  }

  getMyRecipesByUser() {
    this.authorizeService.getUser()
      .subscribe(user => this.name = user.name)
    return this.httpClient.get<MyRecipes[]>(this.apiUrl + this.name);
  }

  PostMyRecipe(myrecipes: MyRecipes): Observable<MyRecipes> {
    return this.httpClient.post<MyRecipes>(this.apiUrl, myrecipes);
  }
}
