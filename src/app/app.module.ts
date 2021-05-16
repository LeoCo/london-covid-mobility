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
import { PlotByMetricComponent } from './components/analyser/plot-by-metric/plot-by-metric.component';
import { MetricStatsComponent } from './components/analyser/metric-stats/metric-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    TableComponent,
    PlotComponent,
    HeaderComponent,
    AnalyserComponent,
    OverviewComponent,
    PlotByMetricComponent,
    MetricStatsComponent
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
