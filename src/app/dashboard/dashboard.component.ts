import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boardSize;
  boardOptions = Array.apply(null, Array(8)).map(function (_, i) {
    return i + 3;
  });

  constructor(private router: Router, private game: GameService) {}

  ngOnInit(): void {
    this.boardSize = this.game.boardSize.value;
  }

  startNewGame() {
    console.log('boardSize', this.boardSize);
    this.game.boardSize.next(this.boardSize);
    this.router.navigate(['/match']);
  }
}
