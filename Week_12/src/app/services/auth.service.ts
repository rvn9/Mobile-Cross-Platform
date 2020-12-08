import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }


  logoutUser() {
    return new Promise((resolve, reject) => {
      if(this.fireAuth.currentUser) {
        this.fireAuth.signOut()
        .then(() => {
          console.log("log out");
          resolve();
        }).catch((error) => {
          reject();
        })
      }
    })
  }




  userDetails(){
    return this.fireAuth.user;
  }

}
