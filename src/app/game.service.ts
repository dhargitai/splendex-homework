import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  boardSize: BehaviorSubject<number> = new BehaviorSubject(3);
  board: BehaviorSubject<Array<string>> = new BehaviorSubject(null);
  bestScore: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor() {
    const board = JSON.parse(localStorage.getItem('board'));
    if (board) {
      this.board.next(board);
    }
    const bestScore = JSON.parse(localStorage.getItem('bestScore'));
    if (bestScore) {
      this.bestScore.next(bestScore);
    }
  }
}
