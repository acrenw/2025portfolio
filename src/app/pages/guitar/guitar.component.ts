import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface GuitarContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
}

@Component({
  selector: 'app-guitar',
  imports: [CommonModule],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.scss'
})
export class GuitarComponent {
  selectedContent: GuitarContent | null = null;
  showModal = false;


  // Sample guitar content data - replace with your actual content
  guitarContent: GuitarContent[] = [
    // {
    //   id: 1,
    //   title: 'Blue by Yung Kai Cover',
    //   caption: 'Cover of Blue by Yung Kai.',
    //   videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    //   thumbnailUrl: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Classical',
    //   type: 'video'
    // }
  ];

  constructor(private router: Router, private gameStateService: GameStateService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.guitarContent.sort((a, b) => a.id - b.id);
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

  openModal(content: GuitarContent) {
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
