import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { Favorites } from './Models/Favorites';
import { MyRecipes } from './Models/MyRecipes';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  name: string;

  apiUrl: string = "https://localhost:5001/api/MyFavoriteRecipes/";
  constructor(private httpClient: HttpClient, private authorizeService: AuthorizeService) { }

  getMyFavoriteRecipes() {
    return this.httpClient.get<Favorites[]>(this.apiUrl);
  }

  getMyFavoriteRecipesByUser() {
    this.authorizeService.getUser()
      .subscribe(user => this.name = user.name)
    return this.httpClient.get<Favorites[]>(this.apiUrl + this.name);
  }



  postMyFavoriteRecipe(favorite: Favorites): Observable<Favorites> {
    this.authorizeService.getUser()
      .subscribe(user => this.name = user.name)
    console.log(favorite)
    return this.httpClient.post<Favorites>(this.apiUrl + this.name, favorite);
  }
  //delete(id: number) {
  //  return this.httpClient.delete(`${this.apiUrl}/${id}`);
  //}
}
