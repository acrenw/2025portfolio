import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../services/game-state.service';

interface Viewport {
  scale: number;
  offsetX: number;
  offsetY: number;
  renderW: number;
  renderH: number;
}

interface WorldObject {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-home-scene',
  imports: [CommonModule],
  templateUrl: './home-scene.component.html',
  styleUrl: './home-scene.component.scss'
})
export class HomeSceneComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  
  // world dimensions for scaling
  private readonly WORLD_WIDTH = 1280;
  private readonly WORLD_HEIGHT = 720;
  
  // viewport stuff - handles scaling and positioning
  private viewport: Viewport = { scale: 1, offsetX: 0, offsetY: 0, renderW: 0, renderH: 0 };
  
  // game state variables
  private bgImageSrc = 'assets/images/home-bg.PNG';
  private playerImageSrc = 'assets/images/player-front-up.PNG';
  private bgIntervalId: any;
  private playerIntervalId: any;
  
  // player state
  private playerX = this.WORLD_WIDTH / 2;
  private playerY = this.WORLD_HEIGHT / 2;
  private playerSpeed = 7;
  private playerWidth = 90;
  private playerHeight = 120;
  private playerFacing: 'up' | 'down' | 'left' | 'right' = 'down';
  
  // collision with wall
  private horizonLine = 250;
  
  // collision boundaries
  private collisionObjects: WorldObject[] = [
    { name: 'easel', x: 40, y: 150, width: 95, height: 80 },
    { name: 'desk', x: 170, y: 194, width: 190, height: 30 },
    { name: 'chair', x: 230, y: 225, width: 85, height: 50 },
    { name: 'guitar', x: 391, y: 151, width: 88, height: 80 },
    { name: 'bookshelf', x: 495, y: 142, width: 149, height: 110 },
    { name: 'bed', x: 705, y: 165, width: 128, height: 110 },
    { name: 'bedside-table', x: 865, y: 200, width: 110, height: 25 },
    { name: 'piano', x: 647, y: 430, width: 253, height: 120 }
  ];

  // interactable object boundaries adn routes
  private interactableObjects = [
    { name: 'easel', x: 40, y: 150, width: 95, height: 140, page: 'easel' },
    { name: 'dance-mat', x: 150, y: 430, width: 142, height: 170, page: 'dance-mat' },
    { name: 'pc', x: 170, y: 120, width: 190, height: 180, page: 'pc' },
    { name: 'guitar', x: 391, y: 151, width: 88, height: 160, page: 'guitar' },
    { name: 'bookshelf', x: 495, y: 142, width: 149, height: 200, page: 'bookshelf' },
    { name: 'camera', x: 880, y: 200, width: 60, height: 40, page: 'camera' },
    { name: 'piano', x: 647, y: 430, width: 253, height: 120, page: 'piano' },
    { name: 'awards', x: 700, y: 30, width: 140, height: 58, page: 'awards' },
    { name: 'speech-bubble', x: 0, y: 0, width: 0, height: 0, page: 'speech-bubble' } // Dynamic position
  ];

  // Keybaord tracking
  private keys: { [key: string]: boolean } = {};

  // Images
  private bgImage!: HTMLImageElement;
  private playerImage!: HTMLImageElement;
  private speechBubbleImage!: HTMLImageElement;
  private profileImage!: HTMLImageElement;
  private imagesLoaded = 0;
  private totalImages = 4;
  
  // popup text things
  public showPopup = false;
  public popupText = `
Hi! I'm Cera. I'm a ***Computer Engineering*** student at the ***University of Waterloo*** actively looking for jobs. Learn about me by clicking on any glowing object, or interacting with them using 'z' and using 'x' to exit! 

You can contact me at:
c252wang@uwaterloo.ca | +1 226-698-7985

P.S. You can find more technical details on my computer.`;

  constructor(private router: Router, private gameStateService: GameStateService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.initializeCanvas();
      this.loadImages();
      this.setupEventListeners();
      this.startAnimations();
      
      // restore state from service
      this.restoreGameState();
    }
  }

  ngOnDestroy() {
    if (this.bgIntervalId) {
      clearInterval(this.bgIntervalId);
    }
    if (this.playerIntervalId) {
      clearInterval(this.playerIntervalId);
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewport();
  }

  private initializeCanvas() {
    this.canvas = this.gameCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.updateViewport();
  }

  private loadImages() {
    // load bg
    this.bgImage = new Image();
    this.bgImage.onload = () => this.onImageLoad();
    this.bgImage.src = this.bgImageSrc;
    
    // load player
    this.playerImage = new Image();
    this.playerImage.onload = () => this.onImageLoad();
    this.playerImage.src = this.playerImageSrc;
    
    // load speech bubble
    this.speechBubbleImage = new Image();
    this.speechBubbleImage.onload = () => this.onImageLoad();
    this.speechBubbleImage.src = 'assets/images/speech-bubble.png';
    
    // load profile image
    this.profileImage = new Image();
    this.profileImage.onload = () => this.onImageLoad();
    this.profileImage.src = 'assets/images/player-profile.PNG';
  }

  private onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
      this.startGameLoop();
    }
  }

  private setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      this.keys[event.key.toLowerCase()] = true;
      
      // 'z' key for interactions
      if (event.key.toLowerCase() === 'z') {
        this.handleInteraction();
      }
      
      // 'x' key for exit/close
      if (event.key.toLowerCase() === 'x') {
        this.handleExit();
      }
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.key.toLowerCase()] = false;
    });

    // mouse click listener
    this.canvas.addEventListener('click', (event) => {
      this.handleCanvasClick(event);
    });
  }

  private startAnimations() {
    // bg blink animation
    this.bgIntervalId = setInterval(() => {
      this.toggleBackground();
    }, 200);
    
    // player idle animation
    this.playerIntervalId = setInterval(() => {
      this.togglePlayer();
    }, 300);
  }

  private startGameLoop() {
    this.gameLoop();
  }

  private gameLoop() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update() {
    this.handlePlayerMovement();
  }

  private handlePlayerMovement() {
    const oldX = this.playerX;
    const oldY = this.playerY;

    // movement controls - wasd or arrow keys
    if (this.keys['w'] || this.keys['arrowup']) {
      this.playerY -= this.playerSpeed;
      this.playerImage.src = 'assets/images/player-back-up.PNG';
      this.playerFacing = 'up';
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      this.playerY += this.playerSpeed;
      this.playerImage.src = 'assets/images/player-front-up.PNG';
      this.playerFacing = 'down';
    }
    if (this.keys['a'] || this.keys['arrowleft']) {
      this.playerX -= this.playerSpeed;
      this.playerImage.src = 'assets/images/player-left-up.PNG';
      this.playerFacing = 'left';
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      this.playerX += this.playerSpeed;
      this.playerImage.src = 'assets/images/player-right-up.PNG';
      this.playerFacing = 'right';
    }

    // check for collisions, if yes revert
    if (this.checkCollisions()) {
      this.playerX = oldX;
      this.playerY = oldY;
    }

    // keep player inside the background area (80% of world, centered)
    const bgScale = 0.8;
    const bgWorldWidth = this.WORLD_WIDTH * bgScale; // 1024
    const bgWorldHeight = this.WORLD_HEIGHT * bgScale; // 576
    const bgWorldX = (this.WORLD_WIDTH - bgWorldWidth) / 2; // 128
    const bgWorldY = (this.WORLD_HEIGHT - bgWorldHeight) / 2; // 72
    
    // make sure player stays in the background area
    // background is from x=128 to x=1152, y=72 to y=648
    this.playerX = Math.max(bgWorldX, Math.min(this.playerX, bgWorldX + bgWorldWidth - this.playerWidth));
    this.playerY = Math.max(bgWorldY, Math.min(this.playerY, bgWorldY + bgWorldHeight - this.playerHeight));
    
    // save game state after movement
    this.saveGameState();
  }

  private checkCollisions(): boolean {
    // Scale
    const bgScale = 0.8;
    const bgWorldWidth = this.WORLD_WIDTH * bgScale; // 1024
    const bgWorldHeight = this.WORLD_HEIGHT * bgScale; // 576
    const bgWorldX = (this.WORLD_WIDTH - bgWorldWidth) / 2; // 128
    const bgWorldY = (this.WORLD_HEIGHT - bgWorldHeight) / 2; // 72
    
    const scaledHorizonLine = (this.horizonLine - bgWorldY) / bgScale;
    if (this.playerY < this.horizonLine) {
      return true;
    }

    // convert collision objects to world coords
    for (const obj of this.collisionObjects) {
      // convert object from background coords (1024x576) to world coords (1280x720)
      const objWorldX = bgWorldX + obj.x;
      const objWorldY = bgWorldY + obj.y;
      const objWorldWidth = obj.width;
      const objWorldHeight = obj.height;
      
      const isColliding = this.isColliding(this.playerX, this.playerY, this.playerWidth, this.playerHeight, 
                          objWorldX, objWorldY, objWorldWidth, objWorldHeight);
      
      if (isColliding) {
       return true;
      }
    }

    return false;
  }

  private isColliding(x1: number, y1: number, w1: number, h1: number,
                     x2: number, y2: number, w2: number, h2: number): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  private toggleBackground() {
    this.bgImageSrc = this.bgImageSrc === 'assets/images/home-bg.PNG' 
      ? 'assets/images/home-bg-glow.png' 
      : 'assets/images/home-bg.PNG';
    this.bgImage.src = this.bgImageSrc;
  }

  private togglePlayer() {
    if (this.playerImage.src.includes('front-up')) {
      this.playerImage.src = 'assets/images/player-front-down.PNG';
    } else if (this.playerImage.src.includes('front-down')) {
      this.playerImage.src = 'assets/images/player-front-up.PNG';
    } else if (this.playerImage.src.includes('back-up')) {
      this.playerImage.src = 'assets/images/player-back-down.PNG';
    } else if (this.playerImage.src.includes('back-down')) {
      this.playerImage.src = 'assets/images/player-back-up.PNG';
    } else if (this.playerImage.src.includes('left-up')) {
      this.playerImage.src = 'assets/images/player-left-down.PNG';
    } else if (this.playerImage.src.includes('left-down')) {
      this.playerImage.src = 'assets/images/player-left-up.PNG';
    } else if (this.playerImage.src.includes('right-up')) {
      this.playerImage.src = 'assets/images/player-right-down.PNG';
    } else if (this.playerImage.src.includes('right-down')) {
      this.playerImage.src = 'assets/images/player-right-up.PNG';
    }
  }

  private updateViewport() {
    const containerW = window.innerWidth;
    const containerH = window.innerHeight;
    
    this.viewport = this.computeViewport(containerW, containerH);
    
    // make canvas the right size
    this.canvas.width = containerW;
    this.canvas.height = containerH;
  }

  private computeViewport(containerW: number, containerH: number): Viewport {
    const scale = Math.min(containerW / this.WORLD_WIDTH, containerH / this.WORLD_HEIGHT);
    const renderW = this.WORLD_WIDTH * scale;
    const renderH = this.WORLD_HEIGHT * scale;
    const offsetX = (containerW - renderW) / 2;
    const offsetY = (containerH - renderH) / 2;
    
    return { scale, offsetX, offsetY, renderW, renderH };
  }

  private worldToScreen(worldX: number, worldY: number): { x: number, y: number } {
    return {
      x: this.viewport.offsetX + worldX * this.viewport.scale,
      y: this.viewport.offsetY + worldY * this.viewport.scale
    };
  }

  private screenToWorld(screenX: number, screenY: number): { x: number, y: number } {
    return {
      x: (screenX - this.viewport.offsetX) / this.viewport.scale,
      y: (screenY - this.viewport.offsetY) / this.viewport.scale
    };
  }

  private draw() {
    // clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // draw
    this.drawBackground();
  
    this.drawPlayer();
    this.drawSpeechBubble();
  }

  private drawBackground() {
    // scale
    const worldScreenWidth = this.WORLD_WIDTH * this.viewport.scale;
    const worldScreenHeight = this.WORLD_HEIGHT * this.viewport.scale;
    
    const bgScale = 0.8;
    const bgWidth = worldScreenWidth * bgScale;
    const bgHeight = worldScreenHeight * bgScale;
    
    // center bg in the world
    const bgX = this.viewport.offsetX + (worldScreenWidth - bgWidth) / 2;
    const bgY = this.viewport.offsetY + (worldScreenHeight - bgHeight) / 2;
    
    // draw black border (outer walls)
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(bgX - 4, bgY - 4, bgWidth + 8, bgHeight + 8);
    
    // draw bg image
    this.ctx.drawImage(
      this.bgImage,
      bgX,
      bgY,
      bgWidth,
      bgHeight
    );
  }

  private drawPlayer() {
    const screenPos = this.worldToScreen(this.playerX, this.playerY);
    const screenWidth = this.playerWidth * this.viewport.scale;
    const screenHeight = this.playerHeight * this.viewport.scale;
    
    this.ctx.drawImage(
      this.playerImage,
      screenPos.x,
      screenPos.y,
      screenWidth,
      screenHeight
    );
  }

  private drawSpeechBubble() {
    // no speech bubble when popup is showing
    if (this.showPopup) {
      return;
    }
    
    const screenPos = this.worldToScreen(this.playerX + 100, this.playerY - 10);
    const screenWidth = 50 * this.viewport.scale;
    const screenHeight = 40 * this.viewport.scale;
    
    this.ctx.drawImage(
      this.speechBubbleImage,
      screenPos.x,
      screenPos.y,
      screenWidth,
      screenHeight
    );
  }

  private handleCanvasClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // check if player was clicked first
    const playerScreenPos = this.worldToScreen(this.playerX, this.playerY);
    const playerScreenWidth = this.playerWidth * this.viewport.scale;
    const playerScreenHeight = this.playerHeight * this.viewport.scale;
    
    if (clickX >= playerScreenPos.x && clickX <= playerScreenPos.x + playerScreenWidth &&
        clickY >= playerScreenPos.y && clickY <= playerScreenPos.y + playerScreenHeight) {
      this.showPopup = true;
      return;
    }
    
    // check if speech bubble was clicked first
    const speechBubbleScreenPos = this.worldToScreen(this.playerX + 100, this.playerY - 10);
    const speechBubbleWidth = 50 * this.viewport.scale;
    const speechBubbleHeight = 40 * this.viewport.scale;
    
    if (clickX >= speechBubbleScreenPos.x && clickX <= speechBubbleScreenPos.x + speechBubbleWidth &&
        clickY >= speechBubbleScreenPos.y && clickY <= speechBubbleScreenPos.y + speechBubbleHeight) {
      this.showPopup = true;
      return;
    }
    
    // scale
    const worldScreenWidth = this.WORLD_WIDTH * this.viewport.scale;
    const worldScreenHeight = this.WORLD_HEIGHT * this.viewport.scale;
    const bgScale = 0.8;
    const bgWidth = worldScreenWidth * bgScale;
    const bgHeight = worldScreenHeight * bgScale;
    const bgX = this.viewport.offsetX + (worldScreenWidth - bgWidth) / 2;
    const bgY = this.viewport.offsetY + (worldScreenHeight - bgHeight) / 2;
    
    const bgWorldWidth = this.WORLD_WIDTH * bgScale; // 1024
    const bgWorldHeight = this.WORLD_HEIGHT * bgScale; // 576
    const worldX = ((clickX - bgX) / bgWidth) * bgWorldWidth;
    const worldY = ((clickY - bgY) / bgHeight) * bgWorldHeight;
    
    // check whether interactable
    this.checkObjectClick(worldX, worldY);
  }

  private handleInteraction() {
    console.log('Z key pressed - checking interactions');
    // check if player is close to something and looking at it
    for (const obj of this.interactableObjects) {
      // Skip speech bubble for z key interactions
      if (obj.name === 'speech-bubble') {
        continue;
      }
      
      const isNear = this.isPlayerNearObject(obj);
      const isFacing = this.isPlayerFacingObject(obj);
      console.log(`Object ${obj.name}: near=${isNear}, facing=${isFacing}`);
      
      if (isNear && isFacing) {
        console.log(`Interacting with ${obj.name}`);
        this.navigateToPage(obj.page);
        return;
      }
    }
    console.log('No interactable objects found');
  }

  private handleExit() {
    console.log('X key pressed - handling exit');
    // If popup is showing, close it
    if (this.showPopup) {
      this.closePopup();
    } else {
      // If not on home page, navigate to home
      this.router.navigate(['/']);
    }
  }

  private checkObjectClick(clickX: number, clickY: number) {
    // if click interactable, navigate to corresponding page
    for (const obj of this.interactableObjects) {
      if (this.isPointInObject(clickX, clickY, obj)) {
        this.navigateToPage(obj.page);
        return;
      }
    }
  }

  private isPlayerNearObject(obj: any): boolean {
    // Convert object background coordinates to world coordinates
    const bgScale = 0.8;
    const bgWorldWidth = this.WORLD_WIDTH * bgScale; // 1024
    const bgWorldHeight = this.WORLD_HEIGHT * bgScale; // 576
    const bgWorldX = (this.WORLD_WIDTH - bgWorldWidth) / 2; // 128
    const bgWorldY = (this.WORLD_HEIGHT - bgWorldHeight) / 2; // 72
    
    const objWorldX = bgWorldX + obj.x;
    const objWorldY = bgWorldY + obj.y;
    
    const playerCenterX = this.playerX + this.playerWidth / 2;
    const playerCenterY = this.playerY + this.playerHeight / 2;
    const objCenterX = objWorldX + obj.width / 2;
    const objCenterY = objWorldY + obj.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(playerCenterX - objCenterX, 2) + 
      Math.pow(playerCenterY - objCenterY, 2)
    );
    
    return distance < 120; // Interaction range
  }

  private isPlayerFacingObject(obj: any): boolean {
    // Convert object background coordinates to world coordinates
    const bgScale = 0.8;
    const bgWorldWidth = this.WORLD_WIDTH * bgScale; // 1024
    const bgWorldHeight = this.WORLD_HEIGHT * bgScale; // 576
    const bgWorldX = (this.WORLD_WIDTH - bgWorldWidth) / 2; // 128
    const bgWorldY = (this.WORLD_HEIGHT - bgWorldHeight) / 2; // 72
    
    const objWorldX = bgWorldX + obj.x;
    const objWorldY = bgWorldY + obj.y;
    
    const playerCenterX = this.playerX + this.playerWidth / 2;
    const playerCenterY = this.playerY + this.playerHeight / 2;
    const objCenterX = objWorldX + obj.width / 2;
    const objCenterY = objWorldY + obj.height / 2;
    
    const dx = objCenterX - playerCenterX;
    const dy = objCenterY - playerCenterY;
    
    // Check if player is looking at the object based on which way they're facing
    // Use a more lenient angle check (45 degrees instead of strict directional)
    const angle = Math.atan2(dy, dx);
    const facingAngle = this.getFacingAngle();
    const angleDiff = Math.abs(angle - facingAngle);
    const normalizedAngleDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
    
    return normalizedAngleDiff < Math.PI / 4; // 45 degrees tolerance
  }
  
  private getFacingAngle(): number {
    switch (this.playerFacing) {
      case 'up': return -Math.PI / 2;    // -90 degrees
      case 'down': return Math.PI / 2;   // 90 degrees
      case 'left': return Math.PI;       // 180 degrees
      case 'right': return 0;            // 0 degrees
      default: return 0;
    }
  }

  private isPointInObject(x: number, y: number, obj: any): boolean {
    return x >= obj.x && x <= obj.x + obj.width && 
           y >= obj.y && y <= obj.y + obj.height;
  }

  private navigateToPage(page: string) {
    switch (page) {
      case 'pc':
        this.router.navigate(['/pc']);
        break;
      case 'camera':
        this.router.navigate(['/camera']);
        break;
      case 'awards':
        this.router.navigate(['/awards']);
        break;
      case 'easel':
        this.router.navigate(['/easel']);
        break;
      case 'dance-mat':
        this.router.navigate(['/dance-mat']);
        break;
      case 'guitar':
        this.router.navigate(['/guitar']);
        break;
      case 'bookshelf':
        this.router.navigate(['/bookshelf']);
        break;
      case 'piano':
        this.router.navigate(['/piano']);
        break;
      default:
        console.log('Unknown page:', page);
    }
  }
  
  public closePopup() {
    this.showPopup = false;
    this.saveGameState();
  }
  
  public getFormattedText(): string {
    return this.popupText
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  private restoreGameState() {
    // restore popup state
    this.showPopup = this.gameStateService.getShowPopup();
    
    // restore player position if it exists
    const savedPosition = this.gameStateService.getPlayerPosition();
    if (savedPosition) {
      this.playerX = savedPosition.x;
      this.playerY = savedPosition.y;
      this.playerFacing = savedPosition.facing;
      
      // update player image based on facing direction
      this.updatePlayerImage();
    }
    
    // mark that we've visited
    this.gameStateService.setHasVisited(true);
  }

  private saveGameState() {
    // save current player state
    this.gameStateService.setPlayerPosition(this.playerX, this.playerY, this.playerFacing);
    this.gameStateService.setShowPopup(this.showPopup);
  }

  private updatePlayerImage() {
    switch (this.playerFacing) {
      case 'up':
        this.playerImage.src = 'assets/images/player-back-up.PNG';
        break;
      case 'down':
        this.playerImage.src = 'assets/images/player-front-up.PNG';
        break;
      case 'left':
        this.playerImage.src = 'assets/images/player-left-up.PNG';
        break;
      case 'right':
        this.playerImage.src = 'assets/images/player-right-up.PNG';
        break;
    }
  }
}
