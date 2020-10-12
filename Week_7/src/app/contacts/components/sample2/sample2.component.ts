import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../contacts.model';

@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.scss'],
})
export class Sample2Component implements OnInit {
  @Input() contact: Contact;
  constructor() { }

  ngOnInit() {}

}
