import {Component, OnDestroy, OnInit} from '@angular/core';
import {Student2} from '../students2/student2.model';
import {Subscription} from 'rxjs';
import {Students3Service} from '../students3.service';

@Component({
  selector: 'app-students3',
  templateUrl: './students3.page.html',
  styleUrls: ['./students3.page.scss'],
})
export class Students3Page implements OnInit, OnDestroy {
  students: Student2[];
  private studentSub: Subscription;
  constructor(private students3Service: Students3Service) { }

  ngOnInit() {
    this.studentSub = this.students3Service.getAllStudents().subscribe( students => {
      this.students = students;
    });
  }
  ngOnDestroy(){
    if ( this.studentSub) {
      this.studentSub.unsubscribe();
    }
  }
}
