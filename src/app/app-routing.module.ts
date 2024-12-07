import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './booking/list/list.component';
import { BookDetailComponent } from './booking/details/details.component';
import { BookEditComponent } from './booking/edit/edit.component';
import { BookingComponent } from './booking/bookinghome/booking.component'; 
import { BookCreateComponent } from './booking/create/create.component';



const routes: Routes = [
  { path: 'list', component: BookListComponent },
  { path: 'detail', component: BookDetailComponent },
  { path: 'view/:id', component: BookDetailComponent },
  { path: 'edit/:id', component: BookEditComponent },
  { path: '', component: BookingComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'create', component: BookCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {}
