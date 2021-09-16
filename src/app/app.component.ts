import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'interest';
  total: number;
  radio = 0;
  interest = 3.5;
  amount = 100000;
  time = 30;
  establishCost = 0;
  monthlyFee = 0;
   Payment =  {
    remainder:  new Array,
    interest:  new Array,
    monthly:  new Array,
    term:  new Array,
    fee: new Array
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

  selectPaymentPlan() {
    this.total = 0;
    this.Payment.interest = [];
    this.Payment.monthly = [];
    this.Payment.remainder = [];
    this.Payment.fee = [];
    this.Payment.term = [];
    if (this.radio == 1)
    this.serialPaymentPlan();
    else
    this.amoPaymentPlan();
  }

  serialPaymentPlan() {
    const _interest = this.interest/100;
    const periodicRate = _interest /12;
    const n = this.time *12;
    let remainder = this.amount;
    let i = 0;
    const monthly = this.amount / n;
    while (i < n) {
      this.Payment.interest.push((remainder)*periodicRate);
      this.Payment.monthly.push(monthly);
      this.Payment.fee.push(this.monthlyFee);
      remainder = Math.round((remainder - (this.Payment.monthly[i]))*100)/100 ;
      this.Payment.remainder.push(remainder);
      this.Payment.term.push(this.Payment.monthly[i] + this.Payment.interest[i] +  this.monthlyFee)
      this.total += this.Payment.term[i];
      i++;
    }
      
    if (remainder < 0) { // prevents rounding errors
      remainder = 0;
      this.Payment.remainder[i-1] = 0;
    }
    this.total += this.establishCost;
  }

    amoPaymentPlan() {
      const _interest = this.interest/100;
      const periodicRate = _interest /12;
      const n = this.time *12;
      let remainder = this.amount;
      let i = 1;
      const x = Math.pow(1 + periodicRate, n);
      const monthly = (remainder*x*periodicRate)/(x-1);
      this.total = 0;
      while (i <= n) {
        this.Payment.interest.push((remainder)*periodicRate);
        this.Payment.term.push(monthly + this.monthlyFee);
        remainder = Math.round((remainder - this.Payment.term[i-1] +this.Payment.interest[i-1])*100)/100 ;
        this.Payment.remainder.push(remainder);
        this.Payment.fee.push(this.monthlyFee)
        this.Payment.monthly.push(monthly - this.Payment.interest[i-1] );
        i++;
      }
      this.total = monthly * n + this.monthlyFee* n + this.establishCost;
    }
}
