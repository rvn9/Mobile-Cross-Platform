import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MahasiswaService} from '../mahasiswa.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
      private router: Router,
      private mhsService: MahasiswaService
  ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.mhsService.create(form.value).then(res => {
      this.router.navigateByUrl('/index');
    });
    form.reset();
    this.router.navigateByUrl('/index');
  }
}
