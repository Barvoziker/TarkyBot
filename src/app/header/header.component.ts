import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request'
import { typeItems } from '../models/typeItems.models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  typesTab: typeItems[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllTypes();
  }

  getAllTypes() {
    const query = gql`
    query  {
      items (name: "Water Bottle") {
          types
      }
    }`

    request('https://api.tarkov.dev/graphql', query).then(data => {
      data.items.forEach((type: typeItems) => {




        this.typesTab.push({types: type.types});



      });
      console.log(this.typesTab);
    });
  }
}
