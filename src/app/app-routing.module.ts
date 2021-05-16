import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { TableComponent } from './components/table/table.component';
import { PlotComponent } from './components/plot/plot.component';
import { AnalyserComponent } from './components/analyser/analyser.component';
import { OverviewComponent } from './components/analyser/overview/overview.component';
import { PlotByMetricComponent } from './components/analyser/plot-by-metric/plot-by-metric.component';
import { MetricStatsComponent } from './components/analyser/metric-stats/metric-stats.component';

const routes: Routes = [
  { path: 'uploader', component: UploaderComponent },
  { path: 'table', component: TableComponent },
  { path: 'plot', component: PlotComponent },
  { path: 'analyser', component: AnalyserComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'metric-stats', component: MetricStatsComponent },
      { path: 'plot-by-metric', component: PlotByMetricComponent }
    ]
  },
  { path: '**', redirectTo: 'uploader' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
