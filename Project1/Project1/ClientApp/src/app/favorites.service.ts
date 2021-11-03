import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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



  //PostMyFavoriteRecipe(favorite: any): Observable<any> {
  //  const user = JSON.parse(window.localStorage.getItem('user'))
  //  const f = { answers: favorite.answers, questions: favorite.questions, usersId: user.userId, questionId: favorite.questionId }
  //  return this.httpClient.post<Question>(this.apiUrl, f);
  //}

  //delete(id: number) {
  //  return this.httpClient.delete(`${this.apiUrl}/${id}`);
  //}
}
