import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { request, gql } from 'graphql-request';
import { traders } from 'src/app/models/traders.models';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss']
})
export class TraderComponent implements OnInit {

  traderName: string = this.router.url.substring(this.router.url.lastIndexOf('/') +1);
  TradersTab: traders[] = [];
  currentRoute: string;

  constructor( private router : Router ) {

    this.currentRoute = "";

    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {

          if (event.url == "/traders") {
            return;
          }else if (event.url == "/traders/Ragman") {
            this.TraderGetAll();
            this.TradersTab = this.TradersTab.filter(trader => trader.name == "Ragman");
            console.log(this.TradersTab);
          }
        }
            // console.log(event.url.substring(event.url.lastIndexOf('/') +1));
            // this.traderName = event.url.substring(event.url.lastIndexOf('/') +1);
            // this.TradersTab = [];
            // this.TraderGetAll();
        //   }
        // }
      });

  }

  ngOnInit(): void {
    this.TraderGetAll();
  }

  TraderGetAll() {
    const query = gql`
    query  {
      traders {
        name
        description
      }
    }`


    request('https://api.tarkov.dev/graphql', query).then(data => {
      data.traders.forEach((trader: traders) => {
        this.TradersTab.push({name:trader.name, description: trader.description});
      });
    });
  }

}
