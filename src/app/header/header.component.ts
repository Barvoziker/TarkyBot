import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request';
import { typeItems } from '../models/typeItems.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  typesTab: typeItems[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getAllTypes();
  }

  getAllTypes() {
    const query = gql`
      query {
        items {
          types
        }
      }
    `;

    request('https://api.tarkov.dev/graphql', query).then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        //find if the type is already in the array
        let index = this.typesTab.findIndex(
          (type) => type.types[0] === data.items[i].types[0]
        );

        if (index == -1) {

          this.typesTab.push({ types: data.items[i].types.splice(0, 1)});
        }
      }

      console.log(this.typesTab);
    });
  }
}
