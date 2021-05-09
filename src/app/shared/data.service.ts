import { Injectable } from "@angular/core";
import { Mobility } from "../models/mobility.model";

@Injectable()
export class DataService {
  data: Array<Mobility> = []

  setData(data: Array<Mobility>) {
    this.data = data
  }

  getData(): Array<Mobility> {
    return this.data
  }

}
