import { Injectable } from '@angular/core';
import {Student2} from './students2/student2.model';
import {Student1} from './students1/student1.model';

@Injectable({
  providedIn: 'root'
})
export class Students2Service {
  private students: Student2[] = [
      new Student2('001', 'John Thor', 'Informatika'),
      new Student2('002', 'John Wick', 'Sistem Informasi')
  ];
  constructor() { }

  getAllStudents(){
    return [...this.students];
  }

  getStudent(nim: string){}

  addStudent(student: Student1){
    const x = this.students.push(student);
    console.log(x);
  }
}
