import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorites } from './Models/Favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  apiUrl: string = "https://localhost:5001/api/MyFavoriteRecipes";
  constructor(private httpClient: HttpClient) { }

  getMyFavoriteRecipes() {
    return this.httpClient.get<Favorites[]>(this.apiUrl);
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
