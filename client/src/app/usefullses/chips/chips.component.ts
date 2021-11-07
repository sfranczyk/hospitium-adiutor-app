import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Input() text!: string;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  closeChips() {
    this.close.emit(true);
  }
}
