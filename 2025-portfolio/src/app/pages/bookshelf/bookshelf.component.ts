import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-bookshelf',
  imports: [],
  templateUrl: './bookshelf.component.html',
  styleUrl: './bookshelf.component.scss'
})
export class BookshelfComponent {

  constructor(private router: Router, private gameStateService: GameStateService) {}

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }
}
