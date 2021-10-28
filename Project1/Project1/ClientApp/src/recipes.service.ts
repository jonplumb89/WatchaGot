import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './app/Models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesURL: string = "https://localhost:5001/api/Recipes"; //name of controller
  constructor(private httpClient: HttpClient) { }

  getRecipeDetails() {
    try {
      return this.httpClient.get<Recipe>(this.recipesURL); //recipe comes from recipe.ts
    } catch (e) {
      //build the thing to handle better
    }
   // var recipe = this.httpClient.get(this.recipesURL);
   // return recipe;
   // return this.httpClient.get<Recipe>(this.recipesURL);
  }
}
