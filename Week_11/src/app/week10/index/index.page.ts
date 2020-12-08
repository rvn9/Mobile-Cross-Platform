import { Component, OnInit } from '@angular/core';
import { MahasiswaService } from '../mahasiswa.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  mahasiswa: any;
  constructor(
      private mhsService: MahasiswaService
  ) { }

  ngOnInit() {
    this.mhsService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val()
          }))
        )
    ).subscribe(data => {
      this.mahasiswa = data;
    });
  }
  delete(event, key) {
      this.mhsService.delete(key);
  }
}
