import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  time = moment().valueOf();

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment().valueOf();
    }, 1000);
  }
}
