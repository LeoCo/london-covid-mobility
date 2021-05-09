import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule
  ]
})
export class SharedModule { }
