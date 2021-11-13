import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { Favorites } from './Models/Favorites';
import { MyRecipes } from './Models/MyRecipes';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  name: string;
  recId: number = 0;

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

  //getFavIdsByUser() {
  //  this.authorizeService.getUser()
  //    .subscribe(user => this.name = user.name)
  //  return this.httpClient.get<Favorites["recipeId"]>(this.apiUrl + this.name);
  //}

  

  //postMyFavoriteRecipe(favorite: Favorites): Observable<Favorites> {
  //  this.authorizeService.getUser()
  //    .subscribe(user => this.name = user.name)
  //  favorite.ingredients = this.extractIngredients(favorite)
  //  //console.log(favorite.extendedIngredients);
  //  favorite.userName = this.name;
  //  this.recId = favorite.id;
  //  favorite.recipeId = this.recId;
  //  console.log(favorite.recipeId);
  //  console.log("hit");
  //  return this.httpClient.post<Favorites>(this.apiUrl, favorite);
  //}

  postMyFavoriteRecipe(favorite: Favorites): Observable<Favorites> {
    this.authorizeService.getUser()
      .subscribe(user => this.name = user.name)
    
    favorite.ingredients = this.extractIngredients(favorite)
    console.log(favorite.extendedIngredients);
    this.recId = favorite.id;
    favorite.recipeId = this.recId;
    console.log("hit");
    console.log(favorite.recipeId)
    favorite.userName = this.name;
    return this.httpClient.post<Favorites>(this.apiUrl, favorite);
  }


  extractIngredients(favorite: Favorites): string {
    /*loop over each extendedingredient object(foreach) assign Orinal to a string*/
    let result = '';
    //for (let ingredient in favorite.extendedIngredients) {
    //  result += ingredient.
    //}
    favorite.extendedIngredients.forEach(x => {
      result += x.original + ','
    });
    return result;
  }


  deleteFavoriteRecipe(recipeId: number) {
    return this.httpClient.delete<Favorites[]>(this.apiUrl + recipeId);
  }
}
