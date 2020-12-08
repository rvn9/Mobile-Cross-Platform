import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  userID: string;
  constructor(
    private router:Router, 
    private contactService: ContactService,
    private authSrv: AuthService
    ) { }

  ngOnInit() {
    this.authSrv.userDetail().subscribe(res => {
      console.log('res:',res);
      console.log('uid:',res.uid);
      if (res !== null){
      } else{
        this.router.navigateByUrl('/contacts/index');
      }
    }, err => {
      console.log(err);
    });
  }
  
  onSubmit(form: NgForm) {
    console.log(form);
    this.contactService.create(form.value).then(res =>{
      console.log(res);
      this.router.navigateByUrl('/contacts/index');
    }).catch(error => console.log(error));
    form.reset();
    this.router.navigateByUrl('/contacts/index');
  }

}
