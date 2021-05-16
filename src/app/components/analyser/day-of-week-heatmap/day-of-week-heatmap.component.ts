import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-day-of-week-heatmap',
  templateUrl: './day-of-week-heatmap.component.html',
  styleUrls: ['./day-of-week-heatmap.component.css']
})
export class DayOfWeekHeatmapComponent implements OnInit {

  filterForm = new FormGroup({
    metric: new FormControl(),
    area: new FormControl(),
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
  })

  metrics: string[] = []
  areaNames: string[] = []

  multi: any[] = [];
  view: [number, number] = [800, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Day of Week';
  yAxisLabel: string = 'iso Year and iso Week';

  colorScheme = {
    domain: ['#E44D25', '#5AA454']
  };

  constructor(private dataService: DataService) {
    this.metrics = this.dataService.getMetrics()
    this.areaNames = this.dataService.getAreaNames()

    this.filterForm.setValue({
      metric: this.metrics[0],
      area: this.areaNames[0],
      range: {
        start: '2020-04-06',
        end: '2020-08-02'
      }
    })

    this.onUpdate()
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(value => {this.onUpdate()})
  }

  onUpdate() {
    const metric = this.filterForm.value.metric
    const area = this.filterForm.value.area
    const start = moment(this.filterForm.value.range.start).format('YYYY-MM-DD')
    const end = moment(this.filterForm.value.range.end).format('YYYY-MM-DD')

    this.multi = this.dataService.getTimeSeriesByDayOfWeek(metric,
                                                            area,
                                                            start,
                                                            end)
  }

}
