import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-awards',
  imports: [],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss'
})
export class AwardsComponent {

  constructor(private router: Router, private gameStateService: GameStateService) {}

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }
}
