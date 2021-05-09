import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './uploader/uploader.component';
import { TableComponent } from './table/table.component';
import { PlotComponent } from './plot/plot.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { DataService } from './shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    TableComponent,
    PlotComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
