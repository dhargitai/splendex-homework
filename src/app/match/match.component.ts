import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  isFlipped: Array<boolean>;
  isMatched: Array<boolean>;
  currentTries = 0;
  bestScore;
  boardSize;
  boardOptions = Array.apply(null, Array(8)).map(function (_, i) {
    return i + 3;
  });
  board: Array<string>;
  images = [
    'angular',
    'd3',
    'jenkins',
    'postcss',
    'react',
    'redux',
    'sass',
    'splendex',
    'ts',
    'webpack',
  ];
  currentPair = [];

  constructor(private router: Router, private game: GameService) {}

  ngOnInit(): void {
    this.boardSize = this.game.boardSize.value;
    this.generateBoard();
  }

  flip(index) {
    this.isFlipped[index] = true;
    this.currentPair.push(index);

    if (this.currentPair.length === 2) {
      this.currentTries++;
      if (this.board[this.currentPair[0]] === this.board[this.currentPair[1]]) {
        this.isMatched[this.currentPair[0]] = true;
        this.isMatched[this.currentPair[1]] = true;

        if (this.isMatched.filter((item) => !item).length === 0) {
          if (!this.bestScore || this.bestScore > this.currentTries) {
            this.bestScore = this.currentTries;
          }
        }
      } else {
        const pair = [...this.currentPair];
        setTimeout(() => {
          this.isFlipped[pair[0]] = false;
          this.isFlipped[pair[1]] = false;
        }, 1000);
      }

      this.currentPair = [];
    }
  }

  private generateBoard() {
    const board = [];
    this.currentTries = 0;
    this.currentPair = [];
    this.isFlipped = [];
    this.isMatched = [];
    for (let i = 0; i < this.boardSize; i++) {
      const randomImage = this.images[
        Math.floor(Math.random() * this.images.length)
      ];
      board.push(randomImage);
      board.push(randomImage);

      this.isFlipped.push(false);
      this.isFlipped.push(false);

      this.isMatched.push(false);
      this.isMatched.push(false);
    }
    this.board = this.shuffleArray(board);
  }

  private shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
}
