import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecipesService } from '../../recipes.service';
import { FavoritesService } from '../favorites.service';
import { Favorites } from '../Models/Favorites';
import { Recipe, SedIngredient } from '../Models/Recipe';
import { RecipeInfo } from '../Models/RecipeInfo';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

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
  sizing: NavMenuComponent;

  //@Input() closeHerUp = '';

  //@HostListener()()


  get sanSourceUrl() {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.sourceUrl);
  }

  constructor(private recipeService: RecipesService, private sanatizer: DomSanitizer, private favoritesService: FavoritesService) {

    this.recipeService = recipeService;

  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("toggleBtn")).checked = false;
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
    this.foods.push(food);
    this.in_food = '';
  }


  submitList() {
    let meow = this.foods.join(",");
    console.log(this.sAmount);
    let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=6d824812b91b45929944784ade2c9453&number=" + this.sAmount;
    meow = "&ingredients=" + meow;
    this.recipeService.getRecipies(url + meow).subscribe(data => {
      this.recipes = data;
      console.log(this.recipes);
    })
  }

  getRecipe(id: number) {
    this.recipeService.getRecipe(id).subscribe(data => {
      this.recipeInfos = data;
      this.extendIngreds = data.extendedIngredients;
      if (this.recipeInfos.instructions != null) {
        this.doit = this.removeCh(this.recipeInfos.instructions);
      }
      console.log(this.recipeInfos);
      // update and display modal
      let x = (<ElementCSSInlineStyle>document.getElementById("myModal"));
      if (x != null) x.style.display = 'block';
    })
  }

  modalMode($event) {
    if ($event.target.classList.contains("modalClose")) {
      let modal = (<ElementCSSInlineStyle>document.getElementById("myModal"));
      if (modal != null) modal.style.display = "none";
    }
  }

  delete(value: string) {
    const index = this.foods.indexOf(value, 0);
    if (index > -1) {
      this.foods.splice(index, 1);
    }
  }

  addFavorite(favorite: Favorites) {
    //console.log(favorite.extendedIngredients)
    console.log(favorite);
    this.favoritesService.postMyFavoriteRecipe(favorite).subscribe()
  }
}
