import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { rejects } from 'assert';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  registerUser(value){
    return new Promise<any>((resolve, reject) =>{
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  loguotUser(){
    return new Promise((resolve, reject) => {
      if (this.fireAuth.currentUser){
        this.fireAuth.signOut()
          .then(() => {
            console.log('Log Out');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetail(){
    return this.fireAuth.user;
  }
}
