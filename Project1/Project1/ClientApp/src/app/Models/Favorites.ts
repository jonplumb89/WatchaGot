import { SedIngredient } from "./Recipe";

export class Favorites {
  favoritesId: number;
  userName: string;
  recipeId: number;
  id: number;
  title: string;
  readyInMinutes: number;
  summary: string;
  servings: number;
  instructions: string;
  ingredients: string;
  extendedIngredients: SedIngredient[];

}
