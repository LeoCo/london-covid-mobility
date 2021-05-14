import { Injectable } from "@angular/core";
import { Mobility } from "../models/mobility.model";
import { Point } from "../models/point.model";

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
        
        if (elem.retail_and_recreation != NaN)
          m!.get('retail_and_recreation')!.push({name: elem.date, value: elem.retail_and_recreation})
        
        if (elem.grocery_and_pharmacy != NaN)
          m!.get('grocery_and_pharmacy')!.push({name: elem.date, value: elem.grocery_and_pharmacy})
        
        if (elem.parks != NaN)
          m!.get('parks')!.push({name: elem.date, value: elem.parks})
        
        if (elem.transit_stations != NaN)
          m!.get('transit_stations')!.push({name: elem.date, value: elem.transit_stations})
        
        if (elem.workplaces != NaN)
          m!.get('workplaces')!.push({name: elem.date, value: elem.workplaces})
        
        if (elem.residential != NaN)
          m!.get('residential')!.push({name: elem.date, value: elem.residential})

      }
    }

    return this.multiTimeSeries
  }

  getMultiTimeSeriesFiltered(areaNames = ['City of London', 'Westminster'],
                              metric = 'retail_and_recreation',
                              startDate = '2021-01-01',
                              endDate = '2021-04-01') {
    const result = []

    for (let areaName of areaNames) {
      result.push({
        name: areaName,
        series: this.getMultiTimeSeries()
                    .get(areaName)!
                    .get(metric)!
                    .filter((p) => (startDate <= p.name && p.name <= endDate))
      })
    }

    return result

  }

}
