import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  switchSize: boolean

  constructor() {

  }

  reSize(thing: boolean) {
    console.log("hit");
    thing = !thing
    thing = this.switchSize;
    return this.switchSize;
  }

}
