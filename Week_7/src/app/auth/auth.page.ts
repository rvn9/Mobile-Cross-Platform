import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onLogin() {
    console.log('on login');
  }
  onSubmit(form: NgForm) {
   console.log('on submit');
   console.log(form);
   if (form.invalid) {
     return;
   }
   const email = form.value.email;
   const password = form.value.password;
   console.log(email, password);
  }
}
