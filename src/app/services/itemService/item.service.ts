import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private apiService: ApiService) { }

  getItem(name:string){
    return this.apiService.doPost({
      query: `query {
        item(name: "${name}") {
          id
          name
          shortName
          description
          image
          wikiLink
          wikiImage
          wikiImageLarge
          type
          rarity
          basePrice
          traderPrice
          traderName
          traderPriceCur
          updated
          slots
          weight
        }
      }`
    });
  }
}
