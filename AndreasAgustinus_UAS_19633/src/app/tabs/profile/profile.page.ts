import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Gesture, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public currUser: any; // temp user
  imageUrl: any; // temp imgurl
  public Dummy: any = []
  pressGesture: Gesture;
  uid = localStorage.getItem('UID');
  constructor(
    el:ElementRef,
    private router: Router, // routing to page
    private authService: AuthService, // auth
    private userService: UserServiceService, // user service
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    el.nativeElement;
   }

  ngOnInit() {
  //   this.pressGesture = new Gesture(this.el, {
  //     recognizers: [
  //       [Hammer.Press, {time: 6000}] // Should be pressed for 6 seconds
  //     ]
  //   });
  //   this.pressGesture.listen();
  //   this.pressGesture.on('press', e => {
  //     // Here you could also emit a value and subscribe to it
  //     // in the component that hosts the element with the directive
  //     console.log('pressed!!');
  //   });
  // }


    this.getListLocation()
    this.userService.getUser(this.uid).subscribe(res =>{
      localStorage.setItem('currUser', JSON.stringify(res));
    })
    this.currUser = JSON.parse(localStorage.getItem('currUser'));
    // console.log(this.currUser.profileImage)
    if(this.currUser.profileImage == null)
    {
      this.imageUrl = "../../../assets/img/orang.png";
    }
    else
    {
      this.imageUrl = this.currUser.profileImage; // set image user
    }
    // console.log(this.currUser)
  }

  ionViewWillEnter(){
    this.userService.getUser(this.uid).subscribe(res =>{
      localStorage.setItem('currUser', JSON.stringify(res));
    })
    this.currUser = JSON.parse(localStorage.getItem('currUser'));
    // console.log(this.currUser.profileImage)
    if(this.currUser.profileImage == null)
    {
      this.imageUrl = "../../../assets/img/orang.png";
    }
    else
    {
      this.imageUrl = this.currUser.profileImage; // set image user
    }
  }

  logout(){
    var msg : any;
    msg = this.authService.logOut(); // call function for logout
    this.presentToast();
    localStorage.clear(); //clearing local storage
    this.router.navigate(['/login']); //nav back to login page
  }
  async presentAlert(locId) {
    const alert = await this.alertController.create({
      header: 'Delete Feed Location!',
      message: 'Are you sure wan\'t to delete this status?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteLocation(locId)
        }
      ]
    });
  
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logout Successful',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  // GET DATA LOCATION
  getListLocation(){
    var self = this
    this.userService.getDataLocation().subscribe(data =>{
      data.payload.child(this.uid).forEach(function(childSnapshot){
        // console.log(childSnapshot.val())
        // SPLIT BUAT BAGUSIN TANGGALNYA
        var tanggal = childSnapshot.key.split('-');
        // console.log(tanggal)
        self.Dummy.push({
          id:childSnapshot.key,//BUAT DELETE BUTUH IDNYA
          date: tanggal[0] +' '+tanggal[1]+ ' '+tanggal[2]+' '+tanggal[3],
          lat: childSnapshot.child('lat').val(),
          lng: childSnapshot.child('lng').val(),
          nama: childSnapshot.child('nama').val()
        })
      })
    })
    // console.log(this.Dummy)
  }
  // DELETE LOCATION
  deleteLocation(locId)
  {
    this.userService.deleteDataLocation(locId);
    this.Dummy.forEach((data,index) => {
      if(data.id == locId)
      {
        this.Dummy.splice(index,1);
      }
    });
    // console.log(locId)
  }
  test(locId)
  {
    // console.log("test clicked")
    this.presentAlert(locId)
  }

}
