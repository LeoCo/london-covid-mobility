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

  range = new FormGroup({
    start: new FormControl('2021-01-01'),
    end: new FormControl('2021-04-01')
  });

  metric = new FormControl()

  metrics: string[] = []

  multi: any[] = [];
  view: [number,number] = [800, 500];

  // options
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
    // this.multi = multi_data;
    // console.log(this.dataService.getMultiTimeSeriesFiltered())
    // this.multi = this.dataService.getMultiTimeSeriesFiltered()
    this.metrics = this.dataService.getMetrics()
    this.metric.setValue(this.metrics[0])
    this.onUpdate()
  }

  ngOnInit(): void {
    this.metric.valueChanges.subscribe(value => {this.onUpdate()})
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)))
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)))
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)))
  }

  onUpdate() {
    console.log('Update!')
    const metric = this.metric.value
    const start = moment(this.range.value.start).format('YYYY-MM-DD')
    const end = moment(this.range.value.end).format('YYYY-MM-DD')
    console.log(start)
    console.log(this.range.value.end)
    
    this.multi = this.dataService.getMultiTimeSeriesFiltered(['City of London', 'Westminster'],
                                                              metric,
                                                              start,
                                                              end)
  }

  onClick(){
    // console.log(this.dataService.getMultiTimeSeries())
    // console.log(this.dataService.getMultiTimeSeriesFiltered())
    console.log(this.dataService.getAreaNames())
    console.log(this.dataService.getMetrics())
    console.log(this.range)
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
