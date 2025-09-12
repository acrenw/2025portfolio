import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface AwardContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
}

@Component({
  selector: 'app-awards',
  imports: [CommonModule],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss'
})
export class AwardsComponent {
  selectedContent: AwardContent | null = null;
  showModal = false;


  // Sample awards content data - replace with your actual content
  awardContent: AwardContent[] = [
    // {
    //   id: 1,
    //   title: 'Piano First Class Honours',
    //   caption: 'Level 8 Piano First Class Honours Issued by The Royal Conservatory of Music.',
    //   imageUrl: 'https://via.placeholder.com/500x300/45b7d1/ffffff?text=Certificate',
    //   thumbnailUrl: 'https://via.placeholder.com/500x300/45b7d1/ffffff?text=Certificate',
    //   type: 'image'
    // },
    {
      id: 2,
      title: 'CCC Top 25%',
      caption: 'Certificate of Distinction Issued by University of Waterloo CEMC.',
      imageUrl: 'assets/awards/ccc.jpg',
      thumbnailUrl: 'assets/awards/ccc.jpg',
      type: 'image'
    },
    {
      id: 3,
      title: 'Second Place Trophy',
      caption: 'Second place winner in the 2019 National Chinese Panda Cup Speech Competition Issued by The Consulate General of the People’s Republic of China in Toronto.',
      imageUrl: 'assets/awards/panda-cup-2019.jpg',
      thumbnailUrl: 'assets/awards/panda-cup-2019.jpg',
      type: 'image'
    },
    {
      id: 4,
      title: 'Second Place Trophy',
      caption: 'Second place winner in the 2018 National Chinese Panda Cup Speech Competition Issued by The Consulate General of the People’s Republic of China in Toronto.',
      videoUrl: 'assets/awards/panda-cup-2018.jpg',
      thumbnailUrl: 'assets/awards/panda-cup-2018.jpg',
      type: 'image'
    },
    {
      id: 5,
      title: 'Short Story Contest Winner',
      caption: 'Short Story published in National Student Short-Story Contest. Certificate of Achievement Issued by Polar Expressions Publishing In recognition for outstanding achievement.',
      videoUrl: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=1st+Place',
      thumbnailUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Speech',
      type: 'image'
    },
    {
      id: 6,
      title: 'Essay Competition',
      caption: 'Got recognized for an essay competition.',
      videoUrl: 'assets/awards/essay-comp.jpg',
      thumbnailUrl: 'assets/awards/essay-comp.jpg',
      type: 'image'
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService) {}

  ngOnInit() {
    this.awardContent.sort((a, b) => a.id - b.id);
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

  openModal(content: AwardContent) {
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedContent = null;
  }
}
