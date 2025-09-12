import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface BookContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
}

@Component({
  selector: 'app-bookshelf',
  imports: [CommonModule],
  templateUrl: './bookshelf.component.html',
  styleUrl: './bookshelf.component.scss'
})
export class BookshelfComponent {
  selectedContent: BookContent | null = null;
  showModal = false;


  // Sample book content data - replace with your actual content
  bookContent: BookContent[] = [
    {
      id: 1,
      title: 'Catepillar Looking for Friends',
      caption: 'My first published book when I was little, of which I both wrote and illustrated.',
      imageUrl: 'assets/bookshelf/caterpillar-looking-for-friends.jpg',
      thumbnailUrl: 'assets/bookshelf/caterpillar-looking-for-friends.jpg',
      type: 'image'
    },
    {
      id: 2,
      title: 'Dream Catcher',
      caption: 'The published Polar Express short story that got picked in the National Student Short-Story Contes.',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/500x400/4ecdc4/ffffff?text=Review',
      type: 'image'
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService) {}

  ngOnInit() {
    this.bookContent.sort((a, b) => a.id - b.id);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'x') {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }

  openModal(content: BookContent) {
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedContent = null;
  }
}
