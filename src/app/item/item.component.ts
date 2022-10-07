import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request'
import { items } from 'src/app/models/items.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  typeName: string = this.router.url.substring(this.router.url.lastIndexOf('/') +1);

  ItemsTab: items[] = [];

  // BartersItemsTab: items[] = [];
  // RationItemsTab: items[] = [];


  ngOnInit() {
    this.ItemGetAll();
  }

  constructor( private router : Router ) { }

  ItemGetAll() {
    const query = gql`
    query  {
      items (types: ${this.typeName}) {
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

        // if(item.types[0] = "Barters"){
        //   this.BartersItemsTab.push(item);
        //   console.log(this.BartersItemsTab);
        // }else if(item.types[0] = "Ration"){
        //   this.RationItemsTab.push(item);
        //   console.log(this.RationItemsTab);
        // }else {
        //   this.ItemsTab.push(item);
        // }

      });
    });
  }
}
