import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../Services/favorites.service';
import { Favorites } from '../Models/Favorites';
import { Recipe } from '../Models/Recipe';
import { RecipeInfo } from '../Models/RecipeInfo';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {

  favorites: Favorites[];
  //recipes: Recipe[] = null;
  idForRec: number[];
  recipeInfos: RecipeInfo;

  constructor(private favoriteService: FavoritesService) { this.favoriteService = favoriteService }

  ngOnInit() {
    this.favoriteService.getMyFavoriteRecipesByUser()
      .subscribe(result => {
        this.favorites = result;
        this.userResBetter(this.favorites);
      })
  }

  deleteFavoriteRecipe(recipeId: number) {
    this.favoriteService.deleteFavoriteRecipe(recipeId).subscribe(() => {
      this.ngOnInit();
      console.log("hello1");
      this.userResBetter(this.favorites);
    })
  }

  userResBetter(q: Favorites[]) {
    let meow = [];
    for (let x of q) {
      let y: number = x.recipeId
      meow.push(y);
    }

    this.idForRec = meow;
    console.log(this.idForRec);
  }

  modalMode($event) {
    console.log("hello")
    if ($event.target.classList.contains("modalClose")) {
      let modal = (<ElementCSSInlineStyle>document.getElementById("myModal"));
      if (modal != null) modal.style.display = "none";
    }
  }

  getRecipe(id: number) {
    // update and display modal
    let x = (<ElementCSSInlineStyle>document.getElementById("myModal"));
    if (x != null) x.style.display = 'block';
  }
}
