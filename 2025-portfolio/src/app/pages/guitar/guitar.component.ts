import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-guitar',
  imports: [],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.scss'
})
export class GuitarComponent {

  constructor(private router: Router, private gameStateService: GameStateService) {}

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }
}
