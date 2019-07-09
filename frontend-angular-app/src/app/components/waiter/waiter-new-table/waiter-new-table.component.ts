import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiter-new-table',
  templateUrl: './waiter-new-table.component.html',
  styleUrls: ['./waiter-new-table.component.scss']
})
export class WaiterNewTableComponent implements OnInit {
  menu = [
    {
      cat: "anti",
      piatti: ["ant1", "ant2", "ant3"]
    },
    {
      cat: "primi",
      piatti: ["prim1", "prim2", "prim3"]
    },
    {
      cat: "secondi",
      piatti: ["second1", "second2", "second3"]
    }
  ];
  table;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.table = params.id;
    });
  }
  ngOnInit (){
    
  }
}
