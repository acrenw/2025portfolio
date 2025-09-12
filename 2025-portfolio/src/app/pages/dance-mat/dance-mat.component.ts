import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface DanceContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
}

@Component({
  selector: 'app-dance-mat',
  imports: [CommonModule],
  templateUrl: './dance-mat.component.html',
  styleUrl: './dance-mat.component.scss'
})
export class DanceMatComponent {
  selectedContent: DanceContent | null = null;
  showModal = false;


  // Dance content data using actual images from assets/dance-mat
  danceContent: DanceContent[] = [
    {
      id: 1,
      title: 'Accendio Group Photo',
      caption: 'Group photo from Accendio dance performance in Kabukicho, Tokyo. I am the one in the top right with two purple bows in my hair.',
      imageUrl: 'assets/dance-mat/accendio-group-photo.jpg',
      thumbnailUrl: 'assets/dance-mat/accendio-group-photo.jpg',
      type: 'image'
    },
    {
      id: 2,
      title: 'Baddie Group Photo',
      caption: 'Group photo from Baddie dance performance at Lazardis Hall, Laurier University. I am the one in the bottom right with the baseball jacket and a tie.',
      imageUrl: 'assets/dance-mat/baddie-group-photo.jpg',
      thumbnailUrl: 'assets/dance-mat/baddie-group-photo.jpg',
      type: 'image'
    },
    {
      id: 3,
      title: 'High School Dance Performance',
      caption: 'Dance performance featuring arm flower choreography from my high school for Double Blue Day.',
      imageUrl: 'assets/dance-mat/dbd-arm-flower.jpg',
      thumbnailUrl: 'assets/dance-mat/dbd-arm-flower.jpg',
      type: 'image'
    },
    {
      id: 4,
      title: 'Dance Practice',
      caption: 'Dance practice photo from Get Back routine, in XuanSe dance studio with my friends.',
      imageUrl: 'assets/dance-mat/get-back-dance-photo.jpg',
      thumbnailUrl: 'assets/dance-mat/get-back-dance-photo.jpg',
      type: 'image'
    },
    {
      id: 5,
      title: 'Kabukicho Group Photo',
      caption: 'Group photo from Kabukicho dance performance. I am the one in the center with a purple bow and half my face covered.',
      imageUrl: 'assets/dance-mat/kabukicho-group-photo.jpg',
      thumbnailUrl: 'assets/dance-mat/kabukicho-group-photo.jpg',
      type: 'image'
    },
    {
      id: 6,
      title: 'High School Dance Team Group Photo',
      caption: 'Group photo from LHSS dance team. I am the one in the light blue sweater.',
      imageUrl: 'assets/dance-mat/lhss-group-photo-1.jpg',
      thumbnailUrl: 'assets/dance-mat/lhss-group-photo-1.jpg',
      type: 'image'
    },
    {
      id: 7,
      title: 'Graduating Dancers Group Photo',
      caption: 'Graduating dancers group photo from LHSS dance team. I am the one in the light blue sweater.',
      imageUrl: 'assets/dance-mat/lhss-group-photo-2.jpg',
      thumbnailUrl: 'assets/dance-mat/lhss-group-photo-2.jpg',
      type: 'image'
    },
    {
      id: 8,
      title: 'Violeta',
      caption: 'My first performance in high school, grade 9, this was a picture of us during the song Violeta.',
      imageUrl: 'assets/dance-mat/violeta.jpg',
      thumbnailUrl: 'assets/dance-mat/violeta.jpg',
      type: 'image'
    },
    {
      id: 9,
      title: 'Dance Practice',
      caption: 'Dance practice in Xuan Se. I am the one in the black hat.',
      imageUrl: 'assets/dance-mat/xuan-se-dance-photo-1.jpg',
      thumbnailUrl: 'assets/dance-mat/xuan-se-dance-photo-1.jpg',
      type: 'image'
    },
    {
      id: 10,
      title: 'Dance Practice',
      caption: 'Dance practice in Xuan Se. I am the one in the black hat.',
      imageUrl: 'assets/dance-mat/xuan-se-dance-photo-2.jpg',
      thumbnailUrl: 'assets/dance-mat/xuan-se-dance-photo-2.jpg',
      type: 'image'
    },
    {
      id: 11,
      title: 'Xuan Se Group Photo',
      caption: 'Group photo from Xuan Se dance team when we were performing for a livestream. I am the one in yellow.',
      imageUrl: 'assets/dance-mat/xuan-se-group-photo.jpg',
      thumbnailUrl: 'assets/dance-mat/xuan-se-group-photo.jpg',
      type: 'image'
    },
    
    // Dance Videos
    {
      id: 12,
      title: 'Baddie Performance',
      caption: 'Dance performance video showcasing contemporary choreography. I am the one with a white skirt.',
      videoUrl: 'https://www.youtube.com/embed/Oxr0JxiVCso',
      thumbnailUrl: 'https://img.youtube.com/vi/Oxr0JxiVCso/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 13,
      title: 'Accendio Performance',
      caption: 'Group dance routine with synchronized movements.',
      videoUrl: 'https://www.youtube.com/embed/sajsWQKAiek',
      thumbnailUrl: 'https://img.youtube.com/vi/sajsWQKAiek/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 14,
      title: 'Tambourine Choreography',
      caption: 'Tambourine choreography by Senna from the NOA dance studio in Akihabara.',
      videoUrl: 'https://www.youtube.com/embed/DWvmQFWLwLY',
      thumbnailUrl: 'https://img.youtube.com/vi/DWvmQFWLwLY/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 17,
      title: 'Dice NMIXX Performance',
      caption: 'Dice NMIXX performance at my high school K-pop dance club. I am the one in the Lolita dress.',
      videoUrl: 'https://www.youtube.com/embed/_pBiNEmWHhY',
      thumbnailUrl: 'https://img.youtube.com/vi/_pBiNEmWHhY/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 18,
      title: 'LA DI DA Everglow Performance',
      caption: 'LA DI DA Everglow performance at my high school K-pop dance club. I am the one in the leather tights',
      videoUrl: 'https://www.youtube.com/embed/GYqEMHqhrLs',
      thumbnailUrl: 'https://img.youtube.com/vi/GYqEMHqhrLs/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 19,
      title: 'Girls Performance',
      caption: 'Chinese New Year livestream performance. I am the one in yellow.',
      videoUrl: 'https://www.youtube.com/embed/bO8DzvtGjto',
      thumbnailUrl: 'https://img.youtube.com/vi/bO8DzvtGjto/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 20,
      title: 'Hey Mama DBD Performance',
      caption: 'Double Blue Day performance at my high school. I am the one in the light blue sweater.',
      videoUrl: 'https://www.youtube.com/embed/niTvaxbkku8',
      thumbnailUrl: 'https://img.youtube.com/vi/niTvaxbkku8/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 21,
      title: 'Panorama IZONE DBD Performance',
      caption: 'Double Blue Day performance at my high school. I am the one in the large Nike shirt.',
      videoUrl: 'https://www.youtube.com/embed/GAG_lFFnSRU',
      thumbnailUrl: 'https://img.youtube.com/vi/GAG_lFFnSRU/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 22,
      title: 'Pink Venom DBD Performance Clip 1',
      caption: 'Double Blue Day performance at my high school. I am the one in the light blue sweater.',
      videoUrl: 'https://www.youtube.com/embed/oKd_tsLKM3U',
      thumbnailUrl: 'https://img.youtube.com/vi/oKd_tsLKM3U/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 23,
      title: 'Pink Venom DBD Performance Clip 2',
      caption: 'Double Blue Day performance at my high school. I am the one in the light blue sweater.',
      videoUrl: 'https://www.youtube.com/embed/Yy0YjQI83bk',
      thumbnailUrl: 'https://img.youtube.com/vi/Yy0YjQI83bk/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 24,
      title: 'Pretty Girls Dance Reel',
      caption: 'Dance reel filmed with Xuan Se friends.',
      videoUrl: 'https://www.youtube.com/embed/ZQEZF117JaY',
      thumbnailUrl: 'https://img.youtube.com/vi/ZQEZF117JaY/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 26,
      title: 'The Quack Quack Dance Reel',
      caption: 'Quack quack dance reel.',
      videoUrl: 'https://www.youtube.com/embed/brI-BJiU6VM',
      thumbnailUrl: 'https://img.youtube.com/vi/brI-BJiU6VM/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 27,
      title: 'Young Boss Dance Reel',
      caption: 'Impromtu dance at lunch with friends in my high school.',
      videoUrl: 'https://www.youtube.com/embed/dqluTAhGLBI',
      thumbnailUrl: 'https://img.youtube.com/vi/dqluTAhGLBI/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 28,
      title: 'Santa Tell Me Dance Reel',
      caption: 'Dance reel for Christmas.',
      videoUrl: 'https://www.youtube.com/embed/SC-YZvHMA8g',
      thumbnailUrl: 'https://img.youtube.com/vi/SC-YZvHMA8g/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 29,
      title: 'Scoop Dance Reel',
      caption: 'My first dance reel.',
      videoUrl: 'https://www.youtube.com/embed/n6tXUaSRiOE',
      thumbnailUrl: 'https://img.youtube.com/vi/n6tXUaSRiOE/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 30,
      title: 'Shape of You Dance Reel',
      caption: 'Duo dance reel with a friend.',
      videoUrl: 'https://www.youtube.com/embed/-2NCYs5t4to',
      thumbnailUrl: 'https://img.youtube.com/vi/-2NCYs5t4to/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 31,
      title: 'Cupid Fity-Fifty Dance Reel',
      caption: 'Dance reel.',
      videoUrl: 'https://www.youtube.com/embed/yK9jC1jydWI',
      thumbnailUrl: 'https://img.youtube.com/vi/yK9jC1jydWI/maxresdefault.jpg',
      type: 'video'
    },
    {
      id: 32,
      title: 'Hands Up Dance Performance',
      caption: 'Live performance at the Chinese Student Association event, with friends from the Captiv8 Dance Crew.',
      videoUrl: 'https://www.youtube.com/embed/E6ZPFT1pL9c',
      thumbnailUrl: 'https://img.youtube.com/vi/E6ZPFT1pL9c/maxresdefault.jpg',
      type: 'video'
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.danceContent.sort((a, b) => a.id - b.id);
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    if (!url) {
      return this.safeUrl('');
    }
    const hasQuery = url.includes('?');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = `rel=0&modestbranding=1&playsinline=1&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`;
    const finalUrl = `${url}${hasQuery ? '&' : '?'}${params}`;
    return this.safeUrl(finalUrl);
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

  openModal(content: DanceContent) {
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedContent = null;
  }
}
