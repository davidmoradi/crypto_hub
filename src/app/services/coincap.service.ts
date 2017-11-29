import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators/map'

@Injectable()
export class CoincapService {

  constructor(private socket: Socket) { }

  startSocket() {
    return this.socket.fromEvent<any>("trades")
      // .map(data => data.message)
  }

  stopSocket() {
    this.socket.removeListener("trades");
  }
}
