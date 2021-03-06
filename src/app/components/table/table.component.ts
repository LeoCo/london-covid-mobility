import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mobility } from '../../models/mobility.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  dataSource: MatTableDataSource<Mobility>;
  displayedColumns: string[] = [
    'date',
    'area_name',
    'area_code',
    'retail_and_recreation',
    'grocery_and_pharmacy',
    'parks',
    'transit_stations',
    'workplaces',
    'residential'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dataService: DataService,
              private router: Router) {
    this.dataSource = new MatTableDataSource(this.dataService.getData())
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.dataSource.sort = <MatSort>this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
