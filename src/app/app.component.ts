import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'interest';
  total;
  interest = 3.5;
  amount = 100000;
  time = 30;
   Payment =  {
    remainder:  new Array,
    interest:  new Array,
    monthly:  new Array,
    progress:  new Array,
  }

  constructor() {}

  ngOnInit(): void {
  }

  interestSlider(event: MatSliderChange) {
    this.interest = event.value ? event.value : 0 ;
  }
  

  yearSlider(event: MatSliderChange) {
    this.time = event.value ? event.value : 0 ;
  }


  paymentPlan() {
    this.Payment.interest = [];
    this.Payment.monthly = [];
    this.Payment.remainder = [];
    this.Payment.progress = [];
    const _interest = this.interest/100;
    const periodicRate = _interest /12;
    const n = this.time *12;
    let remainder = this.amount;
    let i = 0;
    const x = Math.pow(1 + periodicRate, n);
    const monthly = (remainder*x*periodicRate)/(x-1);
    this.total = 0;
    while (i <= n) {
      this.Payment.remainder.push(remainder);
      this.Payment.interest.push((remainder)*periodicRate);
      this.Payment.monthly.push(monthly);

      this.Payment.progress.push(this.Payment.monthly[i]- this.Payment.interest[i]);
      
      remainder = Math.round((remainder - this.Payment.monthly[i] +this.Payment.interest[i])*100)/100 ;
      if (remainder < 0) { // prevents rounding errors
        remainder = 0;
      }
      i++;
    }
    this.total = monthly * n;
  }

}
