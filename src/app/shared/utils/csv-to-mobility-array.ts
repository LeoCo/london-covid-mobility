import { Mobility } from "src/app/models/mobility.model";

/**
 * Takes the csv file and returns an array of objects
 * @param csv csv file as a string
 * @returns array of objects
 */
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
        retail_and_recreation: +line[3],
        grocery_and_pharmacy: +line[4],
        parks: +line[5],
        transit_stations: +line[6],
        workplaces: +line[7],
        residential: +line[8]
      }
      result.push(mobility)
    }

  }

  result.sort((a,b) => (a.date > b.date) ? 1 : ((a.date < b.date) ? -1 : 0))

  return result
}
