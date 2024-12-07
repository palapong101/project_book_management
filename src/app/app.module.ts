import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookingRoutingModule } from './app-routing.module';
import { BookListComponent } from './booking/list/list.component';
import { BookDetailComponent } from './booking/details/details.component';
import { BookEditComponent } from './booking/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/bookinghome/booking.component';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './booking/create/create.component';




const routes: Routes = [
  { path: 'list', component: BookListComponent },
  { path: 'details/:id', component: BookDetailComponent },
  { path: 'edit/:id', component: BookEditComponent },
  { path: '', component: BookingComponent },
  { path: 'bookings', component: BookingComponent }  
];

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    AppComponent,
    BookingComponent,
    BookCreateComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BookingRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}