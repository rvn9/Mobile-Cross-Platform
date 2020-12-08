import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Students3Service } from '../../students3.service';
import { Student2 } from '../../students2/student2.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor(private students3Srv: Students3Service, private router: Router) { }

  ngOnInit() {
  }

  
  onSubmit(form: NgForm) {
    console.log(form);

    const student: Student2 = {
      nim: form.value.nim,
      nama: form.value.nama,
      prodi: form.value.prodi,
    };
    this.students3Srv.addStudent(student);
    this.router.navigateByUrl('/students3');
  }
}
