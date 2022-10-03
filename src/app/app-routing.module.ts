import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      { path: 'items', component: ItemComponent },
    ],
  },

  // { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
