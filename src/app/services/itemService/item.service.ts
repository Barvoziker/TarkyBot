import { Injectable } from '@angular/core';
import { request, gql } from 'graphql-request'
import { items } from 'src/app/models/items.models';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  ItemsTab: items[] = [];

  getItem(name:string){

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

    request('https://api.tarkov.dev/graphql', query).then(data => console.log(data));

  }

}
