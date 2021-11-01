////export class Recipe {
////  id: number;
////  title: string;
////  image: string;
////  imageType: string;
////  usedIngredientCount: number;
////}

export class Recipe {
  id: number;
  image: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: SedIngredient[];
  title: string;
  usedIngredients: SedIngredient[];
  unusedIngredients: any[];
  usedIngredientCount: number;
  imageType: string;
}

export class SedIngredient {
  missedIngredientCount: number;
  missedIngredients: SedIngredient[];
  usedIngredients: SedIngredient[];
  unusedIngredients: any[];
  likes: number;
}

export interface SedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalString: string;
  originalName: string;
  metaInformation: string[];
  meta: string[];
  extendedName?: string;
  image: string;
}



//made up recipe name takes place of model

