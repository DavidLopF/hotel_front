import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsInformationComponent } from './component/hotels-information/hotels-information.component';
import { RoomsInformationComponent } from './component/rooms-information/rooms-information.component';

const routes: Routes = [
  { path: 'roomsHotel', component: RoomsInformationComponent, },
  { path: '', component: HotelsInformationComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
