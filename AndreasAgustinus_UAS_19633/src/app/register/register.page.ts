import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formSignUp: FormGroup;
  errorMsg: string;

  constructor(
    private auth: AuthService,
    private userService: UserServiceService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Memproses akun...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async toastSentEmail(msg: string) {
      const toast = await this.toastController.create({
          message: msg,
          color: 'danger',
          duration: 2500
      });
      toast.present();
  }
  onSubmit(form: NgForm)
  {
    if(form.value.password != form.value.confirmPassword)
    {
      return this.toastSentEmail("Password and Confirm Password doesn\'t match");
    }
    else
    {
      this.auth.signUpWithEmail(form.value.email,form.value.password)
      .then((resp)=>{
        resp.user.sendEmailVerification()
        .then(()=>{
          this.auth.setMessage('Email verifikasi telah dikirim')
          // SEND USER DATA TO DB
          const userData = {
            nama: form.value.fname +" " + form.value.lname,
            email: form.value.email
          };
          this.userService.newUser(userData,resp.user.uid)
            .then(res => {
              console.log(res)
            })
            .catch(err =>{
              console.log(err);
            });
            form.reset()
            this.presentLoading().then(()=>{
              this.router.navigate(['./login']);
              this.toastSentEmail('Email verifikasi sudah dikirim')
            });
        })
        .catch(err =>{
          console.log(err);
        });

      })
      .catch(err =>{
        this.errorMsg = err.message;
      })
    }
  }
}
