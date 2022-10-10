import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request'
import { items } from 'src/app/models/items.models';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  typeName: string = this.router.url.substring(this.router.url.lastIndexOf('/') +1);

  ItemsTab: items[] = [];
  currentRoute: string;


  constructor( private router : Router ) {

    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {

          if (event.url == "/items") {
            return;
          }else{
            console.log(event.url.substring(event.url.lastIndexOf('/') +1));
            this.typeName = event.url.substring(event.url.lastIndexOf('/') +1);
            this.ItemsTab = [];
            this.ItemGetAll(this.typeName);
          }
        }
      });
    }

  ngOnInit() {
    this.ItemGetAll(this.typeName);
  }


  ItemGetAll(typeName: string) {
    const query = gql`
    query  {
      items (types: ${typeName}) {
          id
          name
          shortName
          description
          types
          iconLink
      }
    }`

    request('https://api.tarkov.dev/graphql', query).then(data => {
      data.items.forEach((item: items) => {
        this.ItemsTab.push({id: item.id, name:item.name, shortName: item.shortName, description: item.description, types: item.types, iconLink: item.iconLink});
      });
    });
  }
}

