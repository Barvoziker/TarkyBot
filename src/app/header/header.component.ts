import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request';
import { typeItems } from '../models/typeItems.models';
import { traders } from '../models/traders.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  typesTab: typeItems[] = [];
  tradersTab: traders[] = [];

  requestURL :string = "https://api.tarkov.dev/graphql";

  constructor() {}

  ngOnInit(): void {
    this.getAllTypes();
    this.getAllTraders();
  }

  getAllTypes() {
    const query = gql`
      query {
        items {
          types
        }
      }
    `;

    request(this.requestURL, query).then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let index = this.typesTab.findIndex(
          (type) => type.types[0] === data.items[i].types[0]
        );

        if (index == -1) {
          this.typesTab.push({ types: data.items[i].types.splice(0, 1)});
        }
      }
      this.typesTab.splice(19);
    });
  }


  getAllTraders(){
    const query = gql`
      query {
        traders {
          name
        }
      }
    `;

    request(this.requestURL, query).then((data) => {
      data.traders.forEach((trader : traders) => {
        this.tradersTab.push({name: trader.name});
      }
      );
    });
  }





}
