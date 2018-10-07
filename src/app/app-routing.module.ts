import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from "./details/details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TemplatesComponent} from "./templates/templates.component";

const routes: Routes = [
  {path: '', component: TemplatesComponent},
  {path: 'details', component: DetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
