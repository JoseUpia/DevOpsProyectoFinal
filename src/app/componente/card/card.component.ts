import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() srcImg = '';
  @Input() titulo = '';
  constructor() { }

  ngOnInit(): void {
  }

}
