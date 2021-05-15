import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = [
    'area_name',
    'retail_and_recreation',
    'grocery_and_pharmacy',
    'parks',
    'transit_stations',
    'workplaces',
    'residential'
  ];

  dataSource: Array<{}> = []

  // Chart options
  view: [number,number] = [150, 50];
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = false;
  xAxis: boolean = false;
  yAxis: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Percentage Change From Baseline';
  timeline: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dataService: DataService) {
    this.initDataSource();
   }

  ngOnInit(): void {
  }

  initDataSource() {
    const multiTimeSeries = this.dataService.getMultiTimeSeries()

    for (let area of multiTimeSeries.keys()){

      const row: any = {
        areaName: area
      }
      
      for (let metric of multiTimeSeries.get(area)!.keys()) {
        const series = []
        
        for (let i = 0; i < multiTimeSeries.get(area)!.get(metric)!.length; i += 4){
          series.push(multiTimeSeries.get(area)!.get(metric)![i])
        }

        row[metric] = [{
          name: metric,
          series: series
        }]
      }

      this.dataSource.push(row)
    }
  }

}
