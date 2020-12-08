import { Injectable } from '@angular/core';
import {Student2} from './students2/student2.model';

@Injectable({
  providedIn: 'root'
})
export class Students2Service {
  
  private students: Student2[] = [
    {nim: '001', nama: 'J0hn Thor', prodi: 'Informatika'},
    {nim: '002', nama: 'J0hn Wick', prodi: 'Sistem Infromasi'}
  ];

  constructor() { }

  getAllStudents(){
    return [...this.students];
  }

  getStudent(nim: string){}

  addStudent(student: Student2){
    const x = this.students.push(student);
    console.log(x);
  }
}
