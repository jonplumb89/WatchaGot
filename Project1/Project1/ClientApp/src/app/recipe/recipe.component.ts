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
  recipes: Recipe[] = null;
  foods: String[] = [];
  recipeInfos: RecipeInfo;
  extendIngreds: RecipeInfo["extendedIngredients"];
  missingIngredsCount: Recipe["missedIngredientCount"];
  in_food: any;
  sAmount: string = '';
  doit: string;

  get sanSourceUrl() {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.sourceUrl);
  }

  constructor(private recipeService: RecipesService, private sanatizer: DomSanitizer) {
    this.recipeService = recipeService
  }

  ngOnInit() {
  }

  removeCh(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }



  bang(food: string) {
    if (food.length == 0) return;
    this.foods = this.foods.concat(food.split(/[\s,]+/).filter(x => !this.foods.includes(x)));
    this.in_food = '';
  }

  submitList(sAmount: string) {
    let meow = this.foods.join(",");
    console.log(this.sAmount);
    let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=3133ec68e1e64966beab5325e6a3ee21&number=" + this.sAmount;
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
      if (this.recipeInfos.instructions != null) {
        this.doit = this.removeCh(this.recipeInfos.instructions)
      }
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
