import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: any;
  uploadImage = false;
  imageUrl: any;
  // updateProfile: FormGroup;
  constructor(
      private userService: UserServiceService,
      private navCtrl: NavController,
      private loadingController: LoadingController,
      private router: Router,
      // private popover:PopoverPage,
      private alertController: AlertController,
      private popoverController: PopoverController
  ) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));

    if (this.user.profileImage == null ){
      this.imageUrl = '../../../assets/img/orang.png';
    }else{
      this.imageUrl = this.user.profileImage;
    }
  }


  //Save updated data to firebase
  onSubmit(form: NgForm)
  {
    var temp = this.user.nama;
    this.userService.updateUser(temp, localStorage.getItem('UID'),this.uploadImage)
    this.uploadImage = false; //boolean for user upload image or not
    this.userService.getUser(localStorage.getItem('UID')).subscribe(data=>{
      localStorage.setItem('currUser', JSON.stringify(data)); //update new data to local storage
    })
    this.presentLoading().then(()=>{
      this.router.navigate(['/tabs/t/profile']);
    })
    
  }
  
  // LOADING
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Updating Profile ...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  // POPOVER
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: false
    });

    await popover.present();

    // narik image yang udah di ambil dari gallery / camera
    await popover.onDidDismiss()
        .then(result => {
          this.imageUrl = result.data;
          this.userService.uploadProfileImage(this.imageUrl, localStorage.getItem('UID'));
          this.uploadImage = true;
          // console.log('TEST INI BENER GAA ' + result.data);
        })
        .catch(err => {
          console.log(err);
        });

  }

  async presentAlert() { // alert jika Batal edit//
    const alert = await this.alertController.create({
      message: 'Batal Ubah Profil?',
      buttons: [
        {
          text: 'Ya',
          handler: () => this.navCtrl.navigateBack('/tabs/t/profile')
        },
        {
          text: 'Tidak',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
