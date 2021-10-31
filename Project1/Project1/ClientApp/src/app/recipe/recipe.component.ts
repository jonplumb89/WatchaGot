import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecipesService } from '../../recipes.service';
import { Recipe, SedIngredient } from '../Models/Recipe';
import { RecipeInfo } from '../Models/RecipeInfo';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  sourceUrl: string = "";
  recipes: Recipe = null;
  foods: String[] = [];
  recipeInfos: RecipeInfo;
  extendIngreds: RecipeInfo["extendedIngredients"];
  in_food: any;

  get sanSourceUrl() {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.sourceUrl);
  }

  constructor(private recipeService: RecipesService, private sanatizer: DomSanitizer) {
    this.recipeService = recipeService
  }

  ngOnInit() {
  }

 bang(food: string) {
    if (food.length == 0) return;
   this.foods = this.foods.concat(food.split(/[\s,]+/).filter(x => !this.foods.includes(x)));
    this.in_food = '';
  }

  submitList() {
    let meow = this.foods.join(",");
    let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=3ad1ee3c2ad5442fbe2e4a7b72183b78&number=10";
    meow = "&ingredients=" + meow;
    this.recipeService.getRecipies(url + meow).subscribe(data => {
      this.recipes = data;
      console.log(this.recipes);
    })
  }



  getRecipe(id: number, data: Response) {
    this.recipeService.getRecipe(id).subscribe(data => {
      this.recipeInfos = data;
      this.extendIngreds = data.extendedIngredients;
      console.log(this.recipeInfos);
    })
  }

  delete(value: string) {
    const index = this.foods.indexOf(value, 0);
    if (index > -1) {
      this.foods.splice(index, 1);
    }
  }
}
