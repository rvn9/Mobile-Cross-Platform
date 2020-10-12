import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Recipe} from '../../recipes.model';

@Component({
  selector: 'app-modal-sample1',
  templateUrl: './modal-sample1.component.html',
  styleUrls: ['./modal-sample1.component.scss'],
})
export class ModalSample1Component implements OnInit {
  @Input() selectedRecipe: Recipe;
  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onFav(){
    this.modalCtrl.dismiss({message: 'added to favorite'}, 'confirm');
  }

}
