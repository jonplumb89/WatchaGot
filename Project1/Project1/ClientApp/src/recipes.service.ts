import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './app/Models/Recipe';
import { RecipeInfo } from './app/Models/RecipeInfo';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesURL: string = "https://localhost:5001/api/Recipes"; //name of controller
  constructor(private httpClient: HttpClient) {
  }

  

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

  getRecipies(newShit: string): Observable<any> {
    return this.httpClient.get(newShit);
  }

  getRecipe(id: number) {
    return this.httpClient.get<RecipeInfo>(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3ad1ee3c2ad5442fbe2e4a7b72183b78&includeNutrition=false`);
  }

  askRecipie() {
    return this.httpClient.get<Recipe>(this.recipesURL);
  }
}
