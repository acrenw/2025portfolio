import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface PianoContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
  category: 'covers' | 'composed';
}

@Component({
  selector: 'app-piano',
  imports: [CommonModule],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.scss'
})
export class PianoComponent {
  activeTab: 'covers' | 'composed' = 'covers';
  selectedContent: PianoContent | null = null;
  showModal = false;


  // Sample piano content data - replace with your actual content
  pianoContent: PianoContent[] = [
    // Piano Covers
    // {
    //   id: 1,
    //   title: 'Rondo in C Major Op.52 No.6',
    //   caption: 'Rondo in C Major Op.52 No.6 by Hummel. A piece from the RCM Level 8 Repetoire. Its very light hearted and fun, I really enjoyed doing the trills.',
    //   videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    //   thumbnailUrl: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Classical',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 2,
    //   title: 'With Sweet Lavender Op.62 No.4',
    //   caption: 'With Sweet Lavender Op.62 No.4 by Edwards Macdowell.  A piece from the RCM Level 8 Repetoire I greatly enjoyed. it made me feel at peace and I was able to take a break from the stress of the RCM exam by playing this piece.',
    //   videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    //   thumbnailUrl: 'https://via.placeholder.com/500x400/4ecdc4/ffffff?text=Pop+Cover',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 3,
    //   title: 'Gigue in D Major',
    //   caption: 'Gigue in D Major by Johann Ludwig Krebs. A piece from the RCM Level 8 Repetoire. The dynamics and switch of tone in this piece was very interesting to play and listen to once I got good at it.',
    //   imageUrl: 'https://via.placeholder.com/400x500/45b7d1/ffffff?text=Jazz',
    //   thumbnailUrl: 'https://via.placeholder.com/400x500/45b7d1/ffffff?text=Jazz',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 4,
    //   title: 'Far Away Friend',
    //   caption: 'Far Away Friend by Mike Springer. A piece from the RCM Level 8 Repetoire. I always looked forward to practicing this piece each day as it reminded me of a lot of my distant friends, and it felt like I could really express and feel my emotions through this piece. As someone who was constantly switching schools as a child, this piece really spoke to me.',
    //   videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    //   thumbnailUrl: 'https://via.placeholder.com/500x300/96ceb4/ffffff?text=Film+Score',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 5,
    //   title: 'Merry Go Round of Life',
    //   caption: 'Merry Go Round of Life from Spirited Away. My father introduced me to Spirited Away when I was little as it is one of his favourite movies. We would watch this together as a family almost everytime we got together, which was about once a year. From my mempries associated with it to the beautiful art, soundtrack and storytelling, it is still one of my favourite films to date.',
    //   imageUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   thumbnailUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 5,
    //   title: 'Mystery of Love',
    //   caption: 'Mystery of Love from Call Me by Your Name. I remember watching this because I saw so many tiktoks edits of Timothee Chalamet in this movie LOL, but to my surprise it exceeded my expectations. The pieces by Sufjan Stevens in this movie are absolute masterpieces: Mystery of Love, Futile Devices, Visions of Gideon.',
    //   imageUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   thumbnailUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   type: 'video',
    //   category: 'covers'
    // },
    // {
    //   id: 5,
    //   title: '葬花',
    //   caption: 'This Chinese song was very popular on social media and quite easy to play for a beautiful song, so I attempted it.',
    //   imageUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   thumbnailUrl: 'https://via.placeholder.com/400x600/feca57/ffffff?text=Setup',
    //   type: 'video',
    //   category: 'covers'
    // },
    
    // Composed Pieces
    {
      id: 6,
      title: 'Frost Whale',
      caption: 'My first LoFi. I always wanted to try music production and LoFi, so this was my first creation when I was messing around in GarageBand (the other softwares are too expensive sadge).',
      videoUrl: 'assets/piano/frost-whale.MOV',
      thumbnailUrl: 'assets/piano/frost-whale.png',
      type: 'video',
      category: 'composed'
    },
    {
      id: 7,
      title: 'Late Night Highway',
      caption: 'I created this one the same day that I made Frost Whale, expect I knew I wanted to try out some sound effects and pre-recorded voices, so this was the concoction of that.',
      videoUrl: 'assets/piano/late-night-highway.mov',
      thumbnailUrl: 'assets/piano/late-night-highway.png',
      type: 'video',
      category: 'composed'
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService, private sanitizer: DomSanitizer) {}

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

  setActiveTab(tab: 'covers' | 'composed') {
    this.activeTab = tab;
  }

  getFilteredContent(): PianoContent[] {
    return this.pianoContent
      .filter(content => content.category === this.activeTab)
      .sort((a, b) => a.id - b.id);
  }

  openModal(content: PianoContent) {
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedContent = null;
  }

  private isYouTubeUrl(url?: string): boolean {
    if (!url) return false;
    try {
      const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const host = u.hostname.replace('www.', '');
      return host === 'youtube.com' || host.endsWith('.youtube.com') || host === 'youtu.be';
    } catch {
      return false;
    }
  }

  getIsYouTubeSelected(): boolean {
    return this.isYouTubeUrl(this.selectedContent?.videoUrl);
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getEmbedUrl(url?: string): SafeResourceUrl {
    if (!url) return this.safeUrl('');
    let embed = url;
    try {
      const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const host = u.hostname.replace('www.', '');
      if (host.endsWith('youtube.com')) {
        const vid = u.searchParams.get('v');
        if (vid) {
          embed = `https://www.youtube.com/embed/${vid}`;
        } else if (u.pathname.startsWith('/shorts/')) {
          embed = `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
        } else if (u.pathname.startsWith('/live/')) {
          embed = `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
        }
      } else if (host === 'youtu.be') {
        const id = u.pathname.replace('/', '');
        if (id) embed = `https://www.youtube.com/embed/${id}`;
      }
      const hasQuery = embed.includes('?');
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const params = `rel=0&modestbranding=1&playsinline=1&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`;
      embed = `${embed}${hasQuery ? '&' : '?'}${params}`;
    } catch {}
    return this.safeUrl(embed);
  }
}
