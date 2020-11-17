import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MahasiswaService} from '../mahasiswa.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  mahasiswa: any;
  key: string;
  nama: string;
  nim: string;
  prodi: string;
  @ViewChild('f', null) f: NgForm;

  constructor(
      private activatedRoute: ActivatedRoute,
      private mhsService: MahasiswaService,
      private db: AngularFireDatabase,
      private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('key')) { return; }
      const key = paramMap.get('key');
      this.key = key;
      this.db.object('/mahasiswa/' + key).valueChanges().subscribe(data => {
        this.mahasiswa = data;
        if (this.mahasiswa){
          this.nama = this.mahasiswa.nama;
          this.nim = this.mahasiswa.nim;
          this.prodi = this.mahasiswa.prodi;
        }
      });
    });
  }
  onSubmit(form: NgForm) {
    this.mhsService.update(this.key, form.value).then(res => {
      this.router.navigateByUrl('/index');
    });
    form.reset();
    this.router.navigateByUrl('/index');
  }
}
