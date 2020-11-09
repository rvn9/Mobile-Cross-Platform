import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MahasiswaService {

  constructor(
      private http: HttpClient
  ) { }

  getAllStudents() {
    return this.http.get('http://ionic2020api.seedlab.id/mahasiswa/select.php');
  }
  insertMhs(newMhs: any) {
    const mhs = {
      nim: newMhs.nim,
      nama: newMhs.nama,
      prodi: newMhs.prodi
    };
    const data = JSON.stringify(mhs);
    return this.http.post<any>('http://ionic2020api.seedlab.id/mahasiswa/insert.php', data);
  }
  deleteMhs(nim: string) {
    const data = JSON.stringify({id: nim});
    console.log(data);
    return this.http.post<any>('http://ionic2020api.seedlab.id/mahasiswa/delete.php', data);
  }
}
