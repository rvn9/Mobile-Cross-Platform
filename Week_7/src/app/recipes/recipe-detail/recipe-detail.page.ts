import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipes.model';
import {RecipesService} from '../recipes.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  constructor(
      private activatedRoute: ActivatedRoute,
      private recipesService: RecipesService,
      private router: Router,
      private alertController: AlertController,
      private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) { return; }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });
  }
  deleteRecipe() {
    this.recipesService.deleteRecipe(this.loadedRecipe.id);
    this.router.navigate(['/recipes']);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Recipe deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Delete Recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.deleteRecipe()
        }
      ]
    });

    await alert.present();
  }
}
