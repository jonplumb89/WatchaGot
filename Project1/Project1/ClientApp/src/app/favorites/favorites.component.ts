import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../Services/favorites.service';
import { Favorites } from '../Models/Favorites';
import { Recipe } from '../Models/Recipe';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorites[];
  //recipes: Recipe[] = null;

  constructor(private favoriteService: FavoritesService) { this.favoriteService = favoriteService }

  ngOnInit() {
    this.favoriteService.getMyFavoriteRecipesByUser()
      .subscribe(result => {
        this.favorites = result;
      })
  }

  deleteFavoriteRecipe(recipeId: number) {
    this.favoriteService.deleteFavoriteRecipe(recipeId).subscribe(() => {
      this.ngOnInit();
    })
  }

}
