import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { SerchComponent } from './serch/serch.component';

const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full' },
  {path: 'search', component: SerchComponent},
  {path: 'bookmarks', component: BookmarksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
