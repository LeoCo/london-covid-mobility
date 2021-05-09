import { Mobility } from "src/app/models/mobility.model";

export function csv_to_mobility_array(csv: string): Array<Mobility> {

  const result: Array<Mobility> = []

  const lines: Array<string> = csv.split("\n");

  for (var i = 1; i < lines.length; i++) {

    const line = lines[i].replace(/\"/g,"").split(",");

    if (line.length == 9) {
      const mobility: Mobility = {
        date: line[0],
        area_name: line[1],
        area_code: line[2],
        retail_and_recreation_percent_change_from_baseline: +line[3],
        grocery_and_pharmacy_percent_change_from_baseline: +line[4],
        parks_percent_change_from_baseline: +line[5],
        transit_stations_percent_change_from_baseline: +line[6],
        workplaces_percent_change_from_baseline: +line[7],
        residential_percent_change_from_baseline: +line[8]
      }
      result.push(mobility)
    }

  }

  return result
}
