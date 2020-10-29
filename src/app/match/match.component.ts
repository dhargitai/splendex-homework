import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  currentTries = 0;
  bestScore;
  boardSize;
  boardOptions = Array.apply(null, Array(8)).map(function (_, i) {
    return i + 3;
  });
  board: Array<{ image: string; isFlipped: boolean; isMatched: boolean }>;
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

    if (this.game.board.value) {
      this.boardSize = this.game.board.value.length / 2;
      this.board = this.game.board.value;
    }

    if (this.game.bestScore.value) {
      this.bestScore = this.game.bestScore.value;
    }

    if (this.game.currentTries.value) {
      this.currentTries = this.game.currentTries.value;
    }
  }

  flip(index) {
    this.board[index].isFlipped = true;
    this.currentPair.push(index);

    if (this.currentPair.length === 2) {
      this.currentTries++;
      if (
        this.board[this.currentPair[0]].image ===
        this.board[this.currentPair[1]].image
      ) {
        this.board[this.currentPair[0]].isMatched = true;
        this.board[this.currentPair[1]].isMatched = true;

        if (this.board.filter((card) => !card.isMatched).length === 0) {
          if (!this.bestScore || this.bestScore > this.currentTries) {
            this.bestScore = this.currentTries;
          }
        }

        this.game.save({
          currentTries: this.currentTries,
          board: this.board,
          bestScore: this.bestScore,
        });
      } else {
        this.game.save({ currentTries: this.currentTries });
        const pair = [...this.currentPair];
        setTimeout(() => {
          this.board[pair[0]].isFlipped = false;
          this.board[pair[1]].isFlipped = false;
        }, 1000);
      }

      this.currentPair = [];
    }
  }

  generateBoard(saveGameState = false) {
    const board = [];
    this.currentTries = 0;
    this.currentPair = [];
    for (let i = 0; i < this.boardSize; i++) {
      const randomImage = this.images[
        Math.floor(Math.random() * this.images.length)
      ];
      board.push({ image: randomImage, isMatched: false, isFlipped: false });
      board.push({ image: randomImage, isMatched: false, isFlipped: false });
    }
    this.board = this.shuffleArray(board);

    if (saveGameState) {
      this.game.save({
        currentTries: this.currentTries,
        board: this.board,
        bestScore: this.bestScore,
      });
    }
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
