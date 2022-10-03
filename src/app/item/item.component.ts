import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request'
import { items } from 'src/app/models/items.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  ItemsTab: items[] = [];

  ngOnInit() {
    this.ItemService("AK-74N");
  }

  constructor() { }

  ItemService( name:string  ) {
    const query = gql`
    query {
      items(name: "${name}") {
          id
          name
          shortName
          description
          image512pxLink
      }
    }`

    request('https://api.tarkov.dev/graphql', query).then(data => {
      data.items.forEach((item: items) => {
        this.ItemsTab.push({id: item.id, name:item.name, shortName: item.shortName, description: item.description, image512pxLink: item.image512pxLink});
      });
    });
  }
}
