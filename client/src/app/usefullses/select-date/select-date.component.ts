import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {
  @Input() startDate?: Date;
  public fg!: FormGroup;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = Array.from({length: 150}, (_, i) => new Date().getFullYear() - i);

  daysInMonth: {[id: string] : number} = {
    January: 31,
    February: 29,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
  };

  get days(): number[]{
    const range = this.fg ? this.daysInMonth[this.fg.controls.month.value] : 31;
    return Array.from({length: range}, (_, i) => i + 1)
  }

  get date(): Date {
    const fgc = this.fg.controls;
    return new Date(fgc.year.value, this.months.findIndex(m => m === fgc.month.value), fgc.day.value);
  }

  set date(v: Date) {
    this.fg.patchValue({
      day: v.getDay(),
      month: this.months[v.getMonth()],
      year: v.getFullYear(),
    });
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    let setDate = this.startDate ? {
      day: [this.startDate.getDate()],
      month: [this.months[this.startDate.getMonth()]],
      year: [this.startDate.getFullYear()]
    } : {
      day: [this.days[0]],
      month: [this.months[0]],
      year: [this.years[0]]
    }
    this.fg = this.fb.group(setDate);
  }
}
