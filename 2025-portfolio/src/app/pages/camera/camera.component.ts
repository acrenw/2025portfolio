import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent {

  constructor(private router: Router, private gameStateService: GameStateService) {}

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }
}
