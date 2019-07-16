import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})


export class OrderDetailComponent implements OnInit {
  @Input() detail:Dish[];

  constructor() { }

  ngOnInit() {
  }

}
