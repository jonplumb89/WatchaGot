import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { MyRecipes } from '../Models/MyRecipes';
import { MyrecipesService } from '../myrecipes.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent implements OnInit {


  myrecipes: MyRecipes[];
  enableEdit = false;
  enableEditIndex = null;
  thingI: number;
  


  constructor(private myRecipeService: MyrecipesService, private router: Router, private userAuthService: AuthorizeService) { this.myRecipeService = myRecipeService }


  ngOnInit() {
    this.myRecipeService.getMyRecipesByUser()
      .subscribe(result => {
        this.myrecipes = result;
      })
    console.log(this.myrecipes);
  }

  addRecipes(
     title: string, readyInMinutes: number, summary: string, servings: number, instructions: string, ingredients: string, userId: string
  ) {
    let myrecipe = new MyRecipes();
    this.userAuthService.getUser().subscribe(user => {
      myrecipe.userId = user.name;
    });

    myrecipe.title = title;
    myrecipe.readyInMinutes = readyInMinutes;
    myrecipe.summary = summary;
    myrecipe.servings = servings;
    myrecipe.instructions = instructions;
    myrecipe.ingredients = ingredients;

   
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
    console.log(myrecipe);
    window.location.reload();
  }

  deleteRecipe(recipeId: number) {
    this.myRecipeService.deleteRecipe(recipeId).subscribe(() => {
      this.ngOnInit();
    })
  }

  //editFavorite($event: any, recipieId) {
  //  console.log($event.target.id);
  //    this.editRec = !this.editRec;
  //}

  enableEditMethod(e, i) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    this.thingI = i
    console.log(i);
    console.log(this.thingI);
    return i
  }


}

  //addRecipes(
  //  title: string, readyInMinutes: number, summary: string, servings: number, instructions: string, ingredients: string
  //) {
  //  let myrecipe = new MyRecipes();
  //  this.userAuthService.getUser().subscribe(user => {
  //    myrecipe.userId = this.userAuthService.user.name;
  //    myrecipe.title = title;
  //    myrecipe.readyInMinutes = readyInMinutes;
  //    myrecipe.summary = summary;
  //    myrecipe.servings = servings;
  //    myrecipe.instructions = instructions;
  //    myrecipe.ingredients = ingredients;

  //    this.myRecipeService.PostMyRecipe(myrecipe)
  //      .subscribe(() => {
  //        //logging here
  //        this.router.navigateByUrl('/MyRecipes')
  //      }, (error: Response) => {
  //        if (error.status === 404) {
  //          console.log('Not Found');
  //          alert('Not Found');
  //        }

  //        if (error.status === 500) {

  //        }
  //        console.log(myrecipe);
  //      });

  //  });

  //}
  //}


