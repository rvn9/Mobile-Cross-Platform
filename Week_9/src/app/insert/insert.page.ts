import { Component, OnInit } from '@angular/core';
import {MahasiswaService} from '../mahasiswa.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {

  constructor(
      private mhsService: MahasiswaService,
      private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    const mhs = {
      nim: form.value.nim,
      nama: form.value.nama,
      prodi: form.value.prodi
    };
    this.mhsService.insertMhs(mhs).subscribe(res => {
      console.log(res);
    });
    this.router.navigateByUrl('/index');
  }
}
