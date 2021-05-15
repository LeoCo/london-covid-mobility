import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-plot-by-metric',
  templateUrl: './plot-by-metric.component.html',
  styleUrls: ['./plot-by-metric.component.css']
})
export class PlotByMetricComponent implements OnInit {

  filterForm = new FormGroup({
    metric: new FormControl(),
    days: new FormControl(),
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
  })

  areaNamesSelector: Array<{name: string, checked: boolean}> = []

  metrics: string[] = []

  days = [
    {name: 'Monday', value: 1},
    {name: 'Tuesday', value: 2},
    {name: 'Wednesday', value: 3},
    {name: 'Thursday', value: 4},
    {name: 'Friday', value: 5},
    {name: 'Saturday', value: 6},
    {name: 'Sunday', value: 0}
  ]

  multi: any[] = [];
  // view: [number,number] = [800, 500];
  view: any = undefined;

  // Chart options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Percentage Change From Baseline';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dataService: DataService) {
    this.metrics = this.dataService.getMetrics()

    for (let areaName of this.dataService.getAreaNames()) {
      this.areaNamesSelector.push({
        name: areaName,
        checked: false
      })
    }
    this.areaNamesSelector[0].checked = true

    this.filterForm.setValue({
      metric: this.metrics[0],
      days: [0,1,2,3,4,5,6],
      range: {
        start: '2020-01-01',
        end: '2021-04-01'
      }
    })

    this.onUpdate()
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(value => {this.onUpdate()})
  }

  onUpdate() {
    console.log('Update!')
    const metric = this.filterForm.value.metric
    const start = moment(this.filterForm.value.range.start).format('YYYY-MM-DD')
    const end = moment(this.filterForm.value.range.end).format('YYYY-MM-DD')
    const days = new Set(<number[]>this.filterForm.value.days)
    const areaNames: string[] = []

    for (let areaNameSelector of this.areaNamesSelector) {
      if (areaNameSelector.checked == true){
        areaNames.push(areaNameSelector.name)
      }
    }
    
    this.multi = this.dataService.getMultiTimeSeriesFiltered(areaNames,
                                                              metric,
                                                              start,
                                                              end,
                                                              days)
  }

}
