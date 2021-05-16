import { Injectable } from "@angular/core";
import { Mobility } from "../models/mobility.model";
import { Point } from "../models/point.model";
import * as moment from 'moment';

@Injectable()
export class DataService {
  data: Array<Mobility> = []
  multiTimeSeries: Map<string, Map<string, Array<Point>>> = new Map();
  areaNames: string[] = [];
  metrics: string[] = [];

  setData(data: Array<Mobility>) {
    this.data = data
  }

  getData(): Array<Mobility> {
    return this.data
  }

  getAreaNames(): string[] {
    if (this.areaNames.length == 0) {
      this.areaNames = Array.from(this.getMultiTimeSeries().keys())
    }
    return this.areaNames
  }

  getMetrics(): string[] {
    if (this.metrics.length == 0) {
      const areaName = this.getAreaNames()[0]
      this.metrics = Array.from(this.getMultiTimeSeries().get(areaName)!.keys());
    }
    return this.metrics
  }

  getMultiTimeSeries() {
    // Lazy loading
    if (this.multiTimeSeries.size == 0) {
      
      // Initialize area_name map
      this.multiTimeSeries = new Map();

      for (let elem of this.data) {
        
        if (!this.multiTimeSeries.has(elem.area_name)) {
          const m = new Map();
          m.set('retail_and_recreation', []);
          m.set('grocery_and_pharmacy', []);
          m.set('parks', []);
          m.set('transit_stations', []);
          m.set('workplaces', []);
          m.set('residential', []);
          this.multiTimeSeries.set(elem.area_name, m)
        }

        const m = this.multiTimeSeries.get(elem.area_name)
        
        if (!isNaN(elem.retail_and_recreation))
          m!.get('retail_and_recreation')!.push({name: elem.date, value: elem.retail_and_recreation})
        
        if (!isNaN(elem.grocery_and_pharmacy))
          m!.get('grocery_and_pharmacy')!.push({name: elem.date, value: elem.grocery_and_pharmacy})
        
        if (!isNaN(elem.parks))
          m!.get('parks')!.push({name: elem.date, value: elem.parks})
        
        if (!isNaN(elem.transit_stations))
          m!.get('transit_stations')!.push({name: elem.date, value: elem.transit_stations})
        
        if (!isNaN(elem.workplaces))
          m!.get('workplaces')!.push({name: elem.date, value: elem.workplaces})
        
        if (!isNaN(elem.residential))
          m!.get('residential')!.push({name: elem.date, value: elem.residential})

      }
    }

    return this.multiTimeSeries
  }

  getMultiTimeSeriesFiltered(areaNames: string[], //['City of London', 'Westminster']
                              metric: string,     // 'retail_and_recreation'
                              startDate: string,  // '2021-01-01'
                              endDate: string,    // '2021-04-01'
                              dayOfWeek = new Set([0,1,2,3,4,5,6])) {
    const result = []

    function filterDate(p: Point) {

    }

    for (let areaName of areaNames) {
      result.push({
        name: areaName,
        series: this.getMultiTimeSeries()
                    .get(areaName)!
                    .get(metric)!
                    .filter((p) => (startDate <= p.name &&
                                    p.name <= endDate &&
                                    dayOfWeek.has(moment(p.name).days())
                                    )
                            )
      })
    }

    return result
  }

  getTimeSeriesByDayOfWeek(metric = 'transit_stations',
                            areaName = 'City of London',
                            startDate = '2020-04-06',
                            endDate = '2020-08-02') {
    
    const series = this.getMultiTimeSeries()
                        .get(areaName)!
                        .get(metric)!
                        .filter((p) => (startDate <= p.name &&
                                        p.name <= endDate)
                                )
    
    const monday = []
    const tuesday = []
    const wednesday = []
    const thursday = []
    const friday = []
    const saturday = []
    const sunday = []

    for (let s of series) {
      const date = moment(s.name)

      const point = {
        name: date.isoWeekYear() + '-' + String(date.isoWeek()).padStart(2, '0'),
        value: s.value
      }
      console.log(date)
      console.log(s)

      switch (date.day()) {
          case 1:
            monday.push(point)
            break
          case 2:
            tuesday.push(point)
            break
          case 3:
            wednesday.push(point)
            break
          case 4:
            thursday.push(point)
            break
          case 5:
            friday.push(point)
            break
          case 6:
            saturday.push(point)
            break
          case 0:
            sunday.push(point)
            break
      }
    }

    const res = [
      {
        name: 'Monday',
        series: monday
      },
      {
        name: 'Tuesday',
        series: tuesday
      },
      {
        name: 'Wednesday',
        series: wednesday
      },
      {
        name: 'Thursday',
        series: thursday
      },
      {
        name: 'Friday',
        series: friday
      },
      {
        name: 'Saturday',
        series: saturday
      },
      {
        name: 'Sunday',
        series: sunday
      }
    ]

    return res

  }

}
