import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnChanges, OnDestroy {
  @Input() timer: number = 0;
  @Output() readonly timerDone = new EventEmitter();
  interval;

  ngOnDestroy(): void {
    this.timerFinished();
  }

  initTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timer = this.timer - 1000;

      if (this.timer < 0) {
        this.timerFinished();
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.timer);
    console.log(changes);
    if (this.timer > 0) this.initTimer();
  }

  private timerFinished() {
    clearInterval(this.interval);
    this.timer = 0;
    this.timerDone.emit(this.timer);
  }
}
