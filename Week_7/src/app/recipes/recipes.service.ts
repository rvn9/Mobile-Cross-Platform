import { Injectable } from '@angular/core';
import {Recipe} from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Nasi Goreng',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nasi_goreng_indonesia.jpg/250px-Nasi_goreng_indonesia.jpg',
      ingredients: ['Nasi', 'Bawang Putih', 'Kecap', 'Cabai']
    }, {
      id: 'r2',
      title: 'Gado-gado',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gado-gado_in_Jakarta.JPG/250px-Gado-gado_in_Jakarta.JPG',
      ingredients: ['Lontong', 'Tempe', 'Tahu', 'Timun']
    }
  ];

  constructor() { }
  getAllRecipes(){
    return [...this.recipes];
  }
  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })};
  }
  deleteRecipe(id: string){
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== id;
    });
  }
}
