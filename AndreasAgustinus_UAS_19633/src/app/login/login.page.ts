import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private toastController : ToastController,
    private router: Router
  ) { }
  ngOnInit(){
  }

  ionViewWillEnter(){
    if (localStorage.getItem('currUser')){
      this.router.navigate(['/tabs/t/map'])
    }
  }
  async toastNotif(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  onSubmit(form: NgForm)
  {
    this.authService.signInWithEmail(form.value.email, form.value.password)
      .then(res =>{
        if(res.user.emailVerified){
          this.authService.setUserSession(res.user.uid);
        }
        else{
          this.toastNotif('Email belum terverifikasi');
        }
      })
      .catch(err=>{
        this.toastNotif('Invalid user credentials, please try again')
      })
    form.reset();
  }
}
