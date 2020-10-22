import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  boardSize: BehaviorSubject<number> = new BehaviorSubject(3);

  constructor() {}
}
