import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PivotComponent } from './pivot/pivot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { PivotTableComponent } from './pivot/pivot-table/pivot-table.component';
import { ProgressSpinnerModule } from "primeng/primeng";

@NgModule({
  declarations: [
    AppComponent,
    PivotComponent,
    PivotTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
