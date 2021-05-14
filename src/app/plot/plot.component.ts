import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

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

  onClick(){
    // console.log(this.dataService.getMultiTimeSeries())
    // console.log(this.dataService.getMultiTimeSeriesFiltered())
    // console.log(this.dataService.getAreaNames())
    // console.log(this.dataService.getMetrics())
    console.log(this.filterForm)
  }

}

export var multi_data = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "1990",
        "value": 250000000
      },
      {
        "name": "2010",
        "value": 309000000
      },
      {
        "name": "2011",
        "value": 311000000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "1990",
        "value": 58000000
      },
      {
        "name": "2010",
        "value": 50000020
      },
      {
        "name": "2011",
        "value": 58000000
      }
    ]
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "1990",
        "value": 57000000
      },
      {
        "name": "2010",
        "value": 62000000
      }
    ]
  }
];
