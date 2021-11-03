import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorites } from '../Models/Favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorites[];

  constructor(private favoriteService: FavoritesService) { this.favoriteService = favoriteService }

  ngOnInit() {
    this.favoriteService.getMyFavoriteRecipesByUser()
      .subscribe(result => {
        this.favorites = result;
      })
  }

}
