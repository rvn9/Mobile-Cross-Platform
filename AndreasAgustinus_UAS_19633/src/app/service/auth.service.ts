import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFire: AngularFireAuth,
    private userService: UserServiceService,
    private router: Router
  ) { }

  message: string;

  setUserSession(uid)
  {
    this.userService.getUser(uid).subscribe(data => {
      localStorage.setItem('currUser', JSON.stringify(data));
      localStorage.setItem('UID', uid);
      this.router.navigate(['/tabs/t/map']);
    });
  }
  setMessage(msg: string){
    this.message = msg;
  }

  getMessage(){
    return this.message;
  }

  deleteMessage(){
    return this.message ='';
  }

  signInWithEmail(email, password)
  {
    return this.angularFire.signInWithEmailAndPassword(email,password);
  }
  signUpWithEmail(email, password){
    return this.angularFire.createUserWithEmailAndPassword(email,password);
  }
  logOut(){
    this.angularFire.signOut().then(() =>{
    }).catch((err)=> {
      console.log(err);
    });
  }

}
