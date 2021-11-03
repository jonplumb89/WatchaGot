import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyRecipes } from '../Models/MyRecipes';
import { MyrecipesService } from '../myrecipes.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent implements OnInit {


  myrecipes: MyRecipes[];

  constructor(private myRecipeService: MyrecipesService, private router: Router) { this.myRecipeService = myRecipeService }


  ngOnInit() {
    this.myRecipeService.getMyRecipes()
      .subscribe(result => {
        this.myrecipes = result;
      })
  }

  addRecipes(
    title: string, readyInMinutes: number, summary: string, servings: number, instructions: string, ingredients: string,
  ) {
    let myrecipe = new MyRecipes();
    myrecipe.title = title;
    myrecipe.readyInMinutes = readyInMinutes;
    myrecipe.summary = summary;
    myrecipe.servings = servings;
    myrecipe.instructions = instructions;
    myrecipe.ingredients = ingredients;

    //this.myRecipeService.getMyRecipes()
    //  .subscribe(result => {
    //    this.myrecipes = result;
    //  })

    this.myRecipeService.PostMyRecipe(myrecipe)
      .subscribe(result => {
        //logging here
        this.router.navigateByUrl('/MyRecipes')
      }, (error: Response) => {
        if (error.status === 404) {
          console.log('Not Found');
          alert('Not Found');
        }

        if (error.status === 500) {

        }
        console.log(error.json);
      });
  }

}
