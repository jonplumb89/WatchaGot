import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { MyRecipes } from '../Models/MyRecipes';
import { MyrecipesService } from '../myrecipes.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent implements OnInit {

  myRecipes: MyRecipes[];
  constructor(private myRecipeService: MyrecipesService) { this.myRecipeService = myRecipeService }

  ngOnInit() {
    this.myRecipeService.getMyRecipes()
      .subscribe(result => {
        this.myRecipes = result;
      })
  }
}
