import { Component } from '@angular/core';
import { ItemService } from './services/itemService/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TarkyBot';

  constructor( private ItemsService:ItemService ) {}

  ngOnInit() {
    this.ItemService();
  }


  ItemService() {
    this.ItemsService.getItem('5.45x39mm PS').subscribe((data: any) => {
      console.log(data);
    });
  }
}
