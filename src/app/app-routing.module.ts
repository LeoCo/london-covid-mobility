import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { TableComponent } from './components/table/table.component';
import { PlotComponent } from './components/plot/plot.component';

const routes: Routes = [
  { path: 'uploader', component: UploaderComponent },
  { path: 'table', component: TableComponent },
  { path: 'plot', component: PlotComponent },
  { path: '**', redirectTo: 'uploader' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
