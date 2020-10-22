import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  isFlipped = false;

  constructor() {}

  ngOnInit(): void {}

  flip() {
    // $('.card').toggleClass('flipped');
    this.isFlipped = true;
  }
}
