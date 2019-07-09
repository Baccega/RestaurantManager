import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiter-tables-list',
  templateUrl: './waiter-tables-list.component.html',
  styleUrls: ['./waiter-tables-list.component.scss']
})
export class WaiterTablesListComponent implements OnInit {

  tables:string[] = ["Tavolo 1", "Tavolo 2", "Tavolo 3"];
  table_number:number;


  constructor() { }

  ngOnInit() {
  }
}
