import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './Component/add/add.component';
import { BillComponent } from './Component/bill/bill.component';
import { ViewComponent } from './Component/view/view.component';
import { HomeComponent } from './Component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BillViewComponent } from './Component/bill/bill-view/bill-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    BillComponent,
    ViewComponent,
    HomeComponent,
    BillViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
