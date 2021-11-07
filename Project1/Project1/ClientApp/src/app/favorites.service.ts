import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { Favorites } from './Models/Favorites';

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

  //postMyFavoriteRecipe(favorite: Favorites): Observable<Favorites> {
  //  console.log(favorite)
  //  console.log(this.apiUrl + favorite.title);
  //  return this.httpClient.post<Favorites>(this.apiUrl, favorite);
  //}

  postMyFavoriteRecipe(favorite: Favorites): Observable<Favorites> {
    this.authorizeService.getUser()
      .subscribe(user => this.name = user.name)
    console.log(favorite)
    favorite.userName = this.name;
    return this.httpClient.post<Favorites>(this.apiUrl, favorite);
  }



  //delete(id: number) {
  //  return this.httpClient.delete(`${this.apiUrl}/${id}`);
  //}
}
