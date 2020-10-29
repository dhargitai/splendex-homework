import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentTries: BehaviorSubject<number> = new BehaviorSubject(0);
  boardSize: BehaviorSubject<number> = new BehaviorSubject(3);
  board: BehaviorSubject<
    Array<{ image: string; isFlipped: boolean; isMatched: boolean }>
  > = new BehaviorSubject(null);
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
    const currentTries = JSON.parse(localStorage.getItem('currentTries'));
    if (currentTries) {
      this.currentTries.next(currentTries);
    }
  }

  save({ board = null, bestScore = null, currentTries = null }) {
    if (bestScore) {
      localStorage.setItem('bestScore', bestScore);
    }
    if (board) {
      localStorage.setItem('board', JSON.stringify(board));
    }
    if (currentTries) {
      localStorage.setItem('currentTries', currentTries);
    }
  }
}
