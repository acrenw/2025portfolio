import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface Artwork {
  id: number;
  title: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  category: 'illustrations' | 'designs' | '3d-modelling';
}

@Component({
  selector: 'app-easel',
  imports: [CommonModule],
  templateUrl: './easel.component.html',
  styleUrl: './easel.component.scss'
})
export class EaselComponent {
  activeTab: 'illustrations' | 'designs' | '3d-modelling' = 'illustrations';
  selectedArtwork: Artwork | null = null;
  showModal = false;

  artworks: Artwork[] = [
    // Illustrations
    {
      id: 1,
      title: 'Lemons',
      caption: "This was from university. I wanted to try practicing colours again, since it's been very long since I've last drawn.",
      imageUrl: 'assets/easel/illustrations/lemons.png',
      thumbnailUrl: 'assets/easel/illustrations/lemons.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 2,
      title: 'Sunday Afternoon',
      caption: 'This was from high school. I was doing a digital art challenge where you could only have one layer to draw on, and this was the outcome.',
      imageUrl: 'assets/easel/illustrations/reading_girl.jpg',
      thumbnailUrl: 'assets/easel/illustrations/reading_girl.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 3,
      title: 'Toys still life',
      caption: 'This was a Grade 11 art assignment, where I had to use acrylic on cardboard to draw a still life. I picked out some of my toys. The llama was one of my favourites because I was obsessed with llamas as a child. The little figurine was a gift from my friendand it was also really great to hold since the shape scratches my brain.',
      imageUrl: 'assets/easel/illustrations/lama.jpg',
      thumbnailUrl: 'assets/easel/illustrations/lama.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 4,
      title: 'Morgan Freeman Portrait',
      caption: 'This was a Grade 12 art assignment, also acrylic on cardboard. I picked Morgan Freeman to do a portrait of because he was older so I had more skin texture to work with and I wanted to challenge myself.',
      imageUrl: 'assets/easel/illustrations/morgan_freeman.jpg',
      thumbnailUrl: 'assets/easel/illustrations/morgan_freeman.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 5,
      title: 'Party',
      caption: 'This was from high school. Vintage tea party, acrylic on Canvas (oil is too expensive).',
      imageUrl: 'assets/easel/illustrations/victorian_girls.jpg',
      thumbnailUrl: 'assets/easel/illustrations/victorian_girls.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 6,
      title: 'Butterfly Girl',
      caption: 'This was in middle school. I really liked doing realism of pretty girls back then so I would find lots of references and draw them.',
      imageUrl: 'assets/easel/illustrations/butterfly_girl.jpg',
      thumbnailUrl: 'assets/easel/illustrations/butterfly_girl.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 7,
      title: 'Vase Body',
      caption: 'This was in middle school. I found a reference of a model I really liked, and I also really liked the idea of combining nature with people, so I made flowers come out of her and it looks alright.',
      imageUrl: 'assets/easel/illustrations/bangs_girl.jpg',
      thumbnailUrl: 'assets/easel/illustrations/bangs_girl.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 8,
      title: 'Blind',
      caption: 'This was in middle school. I was trying out the vector style at the time and I also expereinced with patterns in here..',
      imageUrl: 'assets/easel/illustrations/blind_girl.png',
      thumbnailUrl: 'assets/easel/illustrations/blind_girl.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 9,
      title: 'Wild',
      caption: "This was in high school. This was pretty hard since it was my first time trying to draw water droplets, and the repetitiveness got annoying after a while. I also attempted to make the background have less details because it made me look more professional as this was a technique started during impressionalism, but clearly it didn't work out very well.",
      imageUrl: 'assets/easel/illustrations/cheetah_girl.jgp.jpg',
      thumbnailUrl: 'assets/easel/illustrations/cheetah_girl.jgp.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 10,
      title: 'Lone Traveler at Sunset',
      caption: 'This was from high school. Cool scene inspired by traditional C-dramas.',
      imageUrl: 'assets/easel/illustrations/sunset.png',
      thumbnailUrl: 'assets/easel/illustrations/sunset.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 11,
      title: 'Waves',
      caption: 'This was from high school. A sketch of waves, wanted to practice colour that was hyper-realistic.',
      imageUrl: 'assets/easel/illustrations/waves.jpg',
      thumbnailUrl: 'assets/easel/illustrations/waves.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 12,
      title: 'Sky Whale',
      caption: 'This was from high school. It was inspired by the Chinese movie, Big Fish & Begonia. I later listed this as an NFT on OpenSea, then got scammed in 2025 by an email that said I had gotten >2k USD for this piece, and I clicked on the link...',
      imageUrl: 'assets/easel/illustrations/whale.jpg',
      thumbnailUrl: 'assets/easel/illustrations/whale.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 13,
      title: 'No Thoughts Egg Head',
      caption: "This was from high school.Sometimes I just wanna smash my own head in, so this was drawn so I can figuratively smash my head in instead of doing the real thing.",
      imageUrl: 'assets/easel/illustrations/egg_head.jpg',
      thumbnailUrl: 'assets/easel/illustrations/egg_head.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 14,
      title: 'Water Shortage',
      caption: "This was from high school. I was quite sad in high school so I cried a lot, but even though some days felt really heavy, I almost became accomstomed to it and accepted my horribleness. That made me very numb and sad but with no tears, and this was a representation of what it felt like.",
      imageUrl: 'assets/easel/illustrations/no_tears_girl.jpg',
      thumbnailUrl: 'assets/easel/illustrations/no_tears_girl.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 15,
      title: 'Silenced',
      caption: 'This was from high school. I drew this as a polital protest.',
      imageUrl: 'assets/easel/illustrations/silenced_girl.jpg',
      thumbnailUrl: 'assets/easel/illustrations/silenced_girl.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 16,
      title: 'Bubble Tea Day',
      caption: 'This was in high school. This is a sketch of when I went out with my friends to get bubble tea before a hackathon, it was very fun so I wanted to remember it.',
      imageUrl: 'assets/easel/illustrations/bubble_tea.png',
      thumbnailUrl: 'assets/easel/illustrations/bubble_tea.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 17,
      title: 'Chick',
      caption: 'This was in high school. Just as chick drawn from a reference. I was trying out blocking with colours instead of only thriving for details and doing hyper-realism.',
      imageUrl: 'assets/easel/illustrations/chick.png',
      thumbnailUrl: 'assets/easel/illustrations/chick.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 18,
      title: 'Clouds',
      caption: 'This was from high school. Again, me trying to learn how to colour block, and I thought clouds were cute.',
      imageUrl: 'assets/easel/illustrations/clouds.png',
      thumbnailUrl: 'assets/easel/illustrations/clouds.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 19,
      title: 'Sculpture 1',
      caption: 'This was from middle school. It was drawn during an art class when I was trying to practice my art basics, medium is graphite on paper.',
      imageUrl: 'assets/easel/illustrations/sculpture1.jpg',
      thumbnailUrl: 'assets/easel/illustrations/sculpture1.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 20,
      title: 'Sculpture 2',
      caption: 'This was from middle school. It was drawn during an art class when I was trying to practice my art basics, medium is graphite on paper.',
      imageUrl: 'assets/easel/illustrations/sculpture2.jpg',
      thumbnailUrl: 'assets/easel/illustrations/sculpture2.jpg',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 21,
      title: 'Mid Autumn Festival Poster',
      caption: 'This was from high school. It is a poster drawing I did for my Chinese school assignment for the Mid-Autumn Festival, inpired by tradtional chinese ink wash paintings.',
      imageUrl: 'assets/easel/illustrations/chinese_bunny.png',
      thumbnailUrl: 'assets/easel/illustrations/chinese_bunny.png',
      type: 'image',
      category: 'illustrations'
    },
    {
      id: 22,
      title: 'Carton Girl',
      caption: 'THis was in middle school.Tried a character design, I think characters being stuck in little house hold appliances was a trend back then so I also hopped on it.',
      imageUrl: 'assets/easel/illustrations/carton_girl.png',
      thumbnailUrl: 'assets/easel/illustrations/carton_girl.png',
      type: 'image',
      category: 'illustrations'
    },
    
    // Designs
    {
      id: 23,
      title: 'Basket Ball Shoes Poster Design',
      caption: 'This was from high school. Random poster design, wanted to practice some techniques I saw on social media.',
      imageUrl: 'assets/easel/designs/basketball_design.png',
      thumbnailUrl: 'assets/easel/designs/basketball_design.png',
      type: 'image',
      category: 'designs'
    },
    {
      id: 24,
      title: 'Paid Poster Commision',
      caption: 'This was from high school. This was a paid commision by a big Chinese News Company, Da Gong Wen Hui Bao, and it gained >130k views on their platform.',
      imageUrl: 'assets/easel/designs/chicken_design.png',
      thumbnailUrl: 'assets/easel/designs/chicken_design.png',
      type: 'image',
      category: 'designs'
    },
    {
      id: 25,
      title: 'Key Club Logo',
      caption: 'This was from high school. The logo I designed for my division of Key Club while I was the vice president.',
      imageUrl: 'assets/easel/designs/keyclub_logo.png',
      thumbnailUrl: 'assets/easel/designs/keyclub_logo.png',
      type: 'image',
      category: 'designs'
    },
    {
      id: 26,
      title: 'Nobody Cares Shirt',
      caption: 'This was for my Grade 11 art class, where we had to screen print T-Shirts with a squeegee. This was my design because I skateboard and I felt extra cool.',
      imageUrl: 'assets/easel/designs/nobody_cares.png',
      thumbnailUrl: 'assets/easel/designs/nobody_cares.png',
      type: 'image',
      category: 'designs'
    },
    {
      id: 27,
      title: 'Long Board Design',
      caption: 'This was from high school. I got a new long board with a really ugly base plate design, so I figured why not draw my own, so I did that.',
      imageUrl: 'assets/easel/designs/skateboard.jpg',
      thumbnailUrl: 'assets/easel/designs/skateboard.jpg',
      type: 'image',
      category: 'designs'
    },
    {
      id: 28,
      title: 'Waterloo University Frisbee Club Design',
      caption: 'This was from high school. It was aommision by the Waterloo University Frisbee Club, for a design on their frisbee.',
      imageUrl: 'assets/easel/designs/wufc.png',
      thumbnailUrl: 'assets/easel/designs/wufc.png',
      type: 'image',
      category: 'designs'
    },
    
    // 3D Modelling
    {
      id: 29,
      title: 'Pochita',
      caption: 'I was and still kind of obsessed with Chainsaw Man, and Pochita is very cute, so I had to model it.',
      imageUrl: 'assets/easel/3d-modelling/pochita.png',
      thumbnailUrl: 'assets/easel/3d-modelling/pochita.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 30,
      title: 'Candy Girl',
      caption: 'Designed a candy girl figurine for a blind box collection.',
      imageUrl: 'assets/easel/3d-modelling/candygirl.png',
      thumbnailUrl: 'assets/easel/3d-modelling/candygirl.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 31,
      title: 'Art Goose',
      caption: 'The Art Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/art-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/art-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 32,
      title: 'Engineering Goose',
      caption: 'The Engineering Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/eng-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/eng-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 33,
      title: 'Environment Goose',
      caption: 'The Environment Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/env-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/env-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 34,
      title: 'Health Goose',
      caption: 'The Health Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/health-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/health-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 35,
      title: 'Math Goose',
      caption: 'The Math Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/math-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/math-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    {
      id: 36,
      title: 'Science Goose',
      caption: 'The Science Goose design for my UW Geese figurine collection.',
      imageUrl: 'assets/easel/3d-modelling/sci-goose.png',
      thumbnailUrl: 'assets/easel/3d-modelling/sci-goose.png',
      type: 'image',
      category: '3d-modelling'
    },
    
    // yt videos
    {
      id: 37,
      title: 'Sunset Village Draw With Me',
      caption: 'My first art youtube video, has >12k views.',
      videoUrl: 'https://youtu.be/rzcSCLN9PmM',
      thumbnailUrl: 'https://img.youtube.com/vi/rzcSCLN9PmM/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
    },
    {
      id: 38,
      title: 'Sunday Afternoon',
      caption: 'The process video for the Sunday Afternoon piece.',
      videoUrl: 'https://youtu.be/_uWFIWkj6hA',
      thumbnailUrl: 'https://img.youtube.com/vi/_uWFIWkj6hA/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
    },
    {
      id: 39,
      title: 'Etsy Sticker Process',
      caption: 'My sticker design and print process video for my online business, ChildHeart.',
      videoUrl: 'https://youtu.be/0gJHkqd7xwA',
      thumbnailUrl: 'https://img.youtube.com/vi/0gJHkqd7xwA/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
    },
    {
      id: 40,
      title: 'Phone Case Design Processe',
      caption: 'My process for completing an order from ChildHeart, the customer requested a butterfly on their phone case.',
      videoUrl: 'https://youtu.be/b3xqs8ZuWso',
      thumbnailUrl: 'https://img.youtube.com/vi/b3xqs8ZuWso/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
    },
    {
      id: 41,
      title: 'Snacks Draw With Me',
      caption: 'Another draw with me video since the first one performed so well.',
      videoUrl: 'https://youtu.be/EJdPlGHerAE',
      thumbnailUrl: 'https://img.youtube.com/vi/EJdPlGHerAE/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
    },
    {
      id: 42,
      title: 'Cute Girls Draw With Me',
      caption: 'Yet another draw with me video, farming interactions.',
      videoUrl: 'https://youtu.be/zYYP5FY3px4',
      thumbnailUrl: 'https://img.youtube.com/vi/zYYP5FY3px4/maxresdefault.jpg',
      type: 'video',
      category: 'illustrations'
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

  setActiveTab(tab: 'illustrations' | 'designs' | '3d-modelling') {
    this.activeTab = tab;
  }

  getFilteredArtworks(): Artwork[] {
    return this.artworks
      .filter(artwork => artwork.category === this.activeTab)
      .sort((a, b) => a.id - b.id);
  }

  openModal(artwork: Artwork) {
    this.selectedArtwork = artwork;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedArtwork = null;
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
    return this.isYouTubeUrl(this.selectedArtwork?.videoUrl);
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
