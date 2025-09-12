import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private playerX: number | null = null;
  private playerY: number | null = null;
  private playerFacing: 'up' | 'down' | 'left' | 'right' | null = null;
  private showPopup: boolean = true; // Default to true for first visit
  private hasVisited: boolean = false;

  constructor() {}

  // player position methods
  setPlayerPosition(x: number, y: number, facing: 'up' | 'down' | 'left' | 'right') {
    this.playerX = x;
    this.playerY = y;
    this.playerFacing = facing;
  }

  getPlayerPosition(): { x: number, y: number, facing: 'up' | 'down' | 'left' | 'right' } | null {
    if (this.playerX !== null && this.playerY !== null && this.playerFacing !== null) {
      return {
        x: this.playerX,
        y: this.playerY,
        facing: this.playerFacing
      };
    }
    return null;
  }

  // popup state methods
  setShowPopup(show: boolean) {
    this.showPopup = show;
  }

  getShowPopup(): boolean {
    return this.showPopup;
  }

  // session tracking
  setHasVisited(visited: boolean) {
    this.hasVisited = visited;
  }

  getHasVisited(): boolean {
    return this.hasVisited;
  }

  // reset state (for new sessions)
  resetState() {
    this.playerX = null;
    this.playerY = null;
    this.playerFacing = null;
    this.showPopup = true;
    this.hasVisited = false;
  }
}
