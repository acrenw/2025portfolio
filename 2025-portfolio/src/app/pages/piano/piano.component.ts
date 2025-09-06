import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-piano',
  imports: [],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.scss'
})
export class PianoComponent {

  constructor(private router: Router, private gameStateService: GameStateService) {}

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }
}
