import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './components/uploader/uploader.component';
import { TableComponent } from './components/table/table.component';
import { PlotComponent } from './components/plot/plot.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { DataService } from './services/data.service';
import { AnalyserComponent } from './components/analyser/analyser.component';
import { OverviewComponent } from './components/analyser/overview/overview.component';
import { DayOfWeekHeatmapComponent } from './components/analyser/day-of-week-heatmap/day-of-week-heatmap.component';
import { AreaComparisonComponent } from './components/analyser/area-comparison/area-comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    TableComponent,
    PlotComponent,
    HeaderComponent,
    AnalyserComponent,
    OverviewComponent,
    DayOfWeekHeatmapComponent,
    AreaComparisonComponent
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
