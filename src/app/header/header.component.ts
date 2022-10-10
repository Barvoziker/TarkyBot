import { Component, OnInit } from '@angular/core';
import { request, gql } from 'graphql-request';
import { typeItems } from '../models/typeItems.models';
import { traders } from '../models/traders.models';
import { maps } from '../models/maps.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  typesTab: typeItems[] = [];
  tradersTab: traders[] = [];
  mapsTab: maps[] = [];

  requestURL :string = "https://api.tarkov.dev/graphql";

  constructor( private router : Router ) {}

  ngOnInit(): void {
    this.getAllTypes();
    this.getAllTraders();
    this.getAllMaps();
  }

  /**
   * It gets all the types of the items in the database and puts them in an array
   */
  getAllTypes() {
    const query = gql`
      query {
        items {
          id
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
          this.typesTab.push({types: data.items[i].types.splice(0, 1)});
        }
      }
      this.typesTab.splice(19);
    });
  }


  /**
   * It queries the server for all the traders, and then pushes each trader's name into the tradersTab
   * array
   */
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


  /**
   * It queries the server for all the maps, and then adds them to the mapsTab array
   */
  getAllMaps(){
    const query = gql`
      query {
        maps {
          name
        }
      }
    `;

    request(this.requestURL, query).then((data) => {
      data.maps.forEach((map : maps) => {
        this.mapsTab.push({name: map.name});
      }
      );
    });
  }


  getNameTypes( $key : string){
    this.router.navigate(['/items', $key]);
  }


}
