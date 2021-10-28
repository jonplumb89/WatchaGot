import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../Models/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipesService) { this.recipeService = recipeService }

  //ngOnInit() {
  //  var recipes = this.recipeService.getRecipeDetails()
  //}

  ngOnInit() {
    this.recipeService.getRecipeDetails()
      .subscribe(result => {
        this.recipe = result;
      })
  }
}
