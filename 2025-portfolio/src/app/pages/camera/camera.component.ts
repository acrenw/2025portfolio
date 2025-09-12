import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface CameraContent {
  id: number;
  title: string;
  caption: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
}

@Component({
  selector: 'app-camera',
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent {
  selectedContent: CameraContent | null = null;
  showModal = false;


  // Photography content data using actual images from assets/camera
  cameraContent: CameraContent[] = [
    {
      id: 1,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/asakusa-man-biking.JPG',
      thumbnailUrl: 'assets/camera/asakusa-man-biking.JPG',
      type: 'image'
    },
    {
      id: 2,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/asakusa-roof.JPG',
      thumbnailUrl: 'assets/camera/asakusa-roof.JPG',
      type: 'image'
    },
    {
      id: 3,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/asakusa-street1.jpg',
      thumbnailUrl: 'assets/camera/asakusa-street1.jpg',
      type: 'image'
    },
    {
      id: 4,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/asakusa-temple.jpg',
      thumbnailUrl: 'assets/camera/asakusa-temple.jpg',
      type: 'image'
    },
    {
      id: 5,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/before-the-show.jpg',
      thumbnailUrl: 'assets/camera/before-the-show.jpg',
      type: 'image'
    },
    {
      id: 6,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/boat-window.jpg',
      thumbnailUrl: 'assets/camera/boat-window.jpg',
      type: 'image'
    },
    {
      id: 7,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/box-factory.jpg',
      thumbnailUrl: 'assets/camera/box-factory.jpg',
      type: 'image'
    },
    {
      id: 8,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/building-through-tree.jpg',
      thumbnailUrl: 'assets/camera/building-through-tree.jpg',
      type: 'image'
    },
    {
      id: 9,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/butterfly.JPG',
      thumbnailUrl: 'assets/camera/butterfly.JPG',
      type: 'image'
    },
    {
      id: 10,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/caution-floor-slippery.JPG',
      thumbnailUrl: 'assets/camera/caution-floor-slippery.JPG',
      type: 'image'
    },
    {
      id: 11,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/chengdu-bridge.JPG',
      thumbnailUrl: 'assets/camera/chengdu-bridge.JPG',
      type: 'image'
    },
    {
      id: 12,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/chureito-pagoda.JPG',
      thumbnailUrl: 'assets/camera/chureito-pagoda.JPG',
      type: 'image'
    },
    {
      id: 13,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/convex-mirror.JPG',
      thumbnailUrl: 'assets/camera/convex-mirror.JPG',
      type: 'image'
    },
    {
      id: 14,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/deer-gate.JPG',
      thumbnailUrl: 'assets/camera/deer-gate.JPG',
      type: 'image'
    },
    {
      id: 15,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/delivery-man-flowers.JPG',
      thumbnailUrl: 'assets/camera/delivery-man-flowers.JPG',
      type: 'image'
    },
    {
      id: 16,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/delivery-man-smoking.jpg',
      thumbnailUrl: 'assets/camera/delivery-man-smoking.jpg',
      type: 'image'
    },
    {
      id: 17,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/fuji-car.JPG',
      thumbnailUrl: 'assets/camera/fuji-car.JPG',
      type: 'image'
    },
    {
      id: 18,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/fuji-in-bus.JPG',
      thumbnailUrl: 'assets/camera/fuji-in-bus.JPG',
      type: 'image'
    },
    {
      id: 19,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/fuji.jpg',
      thumbnailUrl: 'assets/camera/fuji.jpg',
      type: 'image'
    },
    {
      id: 20,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/girl-and-maple-leaf.JPG',
      thumbnailUrl: 'assets/camera/girl-and-maple-leaf.JPG',
      type: 'image'
    },
    {
      id: 21,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/gondola1.jpg',
      thumbnailUrl: 'assets/camera/gondola1.jpg',
      type: 'image'
    },
    {
      id: 22,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/gondola2.JPG',
      thumbnailUrl: 'assets/camera/gondola2.JPG',
      type: 'image'
    },
    {
      id: 23,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/gondola3.JPG',
      thumbnailUrl: 'assets/camera/gondola3.JPG',
      type: 'image'
    },
    {
      id: 24,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-library.jpg',
      thumbnailUrl: 'assets/camera/guangzhou-library.jpg',
      type: 'image'
    },
    {
      id: 25,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-library2.JPG',
      thumbnailUrl: 'assets/camera/guangzhou-library2.JPG',
      type: 'image'
    },
    {
      id: 26,
      title: 'guangzhou-library3.JPG',
      caption: 'Additional library interior photography.',
      imageUrl: 'assets/camera/guangzhou-library3.JPG',
      thumbnailUrl: 'assets/camera/guangzhou-library3.JPG',
      type: 'image'
    },
    {
      id: 27,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-streets1.JPG',
      thumbnailUrl: 'assets/camera/guangzhou-streets1.JPG',
      type: 'image'
    },
    {
      id: 28,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-streets2.JPG',
      thumbnailUrl: 'assets/camera/guangzhou-streets2.JPG',
      type: 'image'
    },
    {
      id: 29,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-tower.jpg',
      thumbnailUrl: 'assets/camera/guangzhou-tower.jpg',
      type: 'image'
    },
    {
      id: 30,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-tower2.jpg',
      thumbnailUrl: 'assets/camera/guangzhou-tower2.jpg',
      type: 'image'
    },
    {
      id: 31,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/guangzhou-tower3.jpg',
      thumbnailUrl: 'assets/camera/guangzhou-tower3.jpg',
      type: 'image'
    },
    {
      id: 32,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/hiroshima-old-couple.JPG',
      thumbnailUrl: 'assets/camera/hiroshima-old-couple.JPG',
      type: 'image'
    },
    {
      id: 33,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/kyoto-street1.JPG',
      thumbnailUrl: 'assets/camera/kyoto-street1.JPG',
      type: 'image'
    },
    {
      id: 34,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/kyoto-street2.JPG',
      thumbnailUrl: 'assets/camera/kyoto-street2.JPG',
      type: 'image'
    },
    {
      id: 35,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/library-study-group.JPG',
      thumbnailUrl: 'assets/camera/library-study-group.JPG',
      type: 'image'
    },
    {
      id: 36,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/lit-leaf.JPG',
      thumbnailUrl: 'assets/camera/lit-leaf.JPG',
      type: 'image'
    },
    {
      id: 37,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/man-with-grandma.JPG',
      thumbnailUrl: 'assets/camera/man-with-grandma.JPG',
      type: 'image'
    },
    {
      id: 38,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/meiji-jingu-gaien1.JPG',
      thumbnailUrl: 'assets/camera/meiji-jingu-gaien1.JPG',
      type: 'image'
    },
    {
      id: 39,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/meiji-jingu-gaien2.jpg',
      thumbnailUrl: 'assets/camera/meiji-jingu-gaien2.jpg',
      type: 'image'
    },
    {
      id: 40,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/nara-street1.jpg',
      thumbnailUrl: 'assets/camera/nara-street1.jpg',
      type: 'image'
    },
    {
      id: 41,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/nara-street2.JPG',
      thumbnailUrl: 'assets/camera/nara-street2.JPG',
      type: 'image'
    },
    {
      id: 42,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi-bikes.JPG',
      thumbnailUrl: 'assets/camera/onomichi-bikes.JPG',
      type: 'image'
    },
    {
      id: 43,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi-bridge.jpg',
      thumbnailUrl: 'assets/camera/onomichi-bridge.jpg',
      type: 'image'
    },
    {
      id: 44,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi-house-on-island.JPG',
      thumbnailUrl: 'assets/camera/onomichi-house-on-island.JPG',
      type: 'image'
    },
    {
      id: 45,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi-man-with-dog.JPG',
      thumbnailUrl: 'assets/camera/onomichi-man-with-dog.JPG',
      type: 'image'
    },
    {
      id: 46,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi-student.JPG',
      thumbnailUrl: 'assets/camera/onomichi-student.JPG',
      type: 'image'
    },
    {
      id: 47,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/onomichi1.JPG',
      thumbnailUrl: 'assets/camera/onomichi1.JPG',
      type: 'image'
    },
    {
      id: 48,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/panda-park-mom.jpg',
      thumbnailUrl: 'assets/camera/panda-park-mom.jpg',
      type: 'image'
    },
    {
      id: 49,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/police-on-bike.JPG',
      thumbnailUrl: 'assets/camera/police-on-bike.JPG',
      type: 'image'
    },
    {
      id: 50,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/skytree.jpg',
      thumbnailUrl: 'assets/camera/skytree.jpg',
      type: 'image'
    },
    {
      id: 51,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/smoked-man.JPG',
      thumbnailUrl: 'assets/camera/smoked-man.JPG',
      type: 'image'
    },
    {
      id: 52,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/terracotta-army-5.jpg',
      thumbnailUrl: 'assets/camera/terracotta-army-5.jpg',
      type: 'image'
    },
    {
      id: 53,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/terracotta-army1.JPG',
      thumbnailUrl: 'assets/camera/terracotta-army1.JPG',
      type: 'image'
    },
    {
      id: 54,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/time-convienience-store.JPG',
      thumbnailUrl: 'assets/camera/time-convienience-store.JPG',
      type: 'image'
    },
    {
      id: 55,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/toronto-crossing.JPG',
      thumbnailUrl: 'assets/camera/toronto-crossing.JPG',
      type: 'image'
    },
    {
      id: 56,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/toronto-pigeons.JPG',
      thumbnailUrl: 'assets/camera/toronto-pigeons.JPG',
      type: 'image'
    },
    {
      id: 57,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/waterfall1.JPG',
      thumbnailUrl: 'assets/camera/waterfall1.JPG',
      type: 'image'
    },
    {
      id: 58,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/waterfall2.JPG',
      thumbnailUrl: 'assets/camera/waterfall2.JPG',
      type: 'image'
    },
    {
      id: 59,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/window-tree.JPG',
      thumbnailUrl: 'assets/camera/window-tree.JPG',
      type: 'image'
    },
    {
      id: 60,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/xian-museum-budda1.jpg',
      thumbnailUrl: 'assets/camera/xian-museum-budda1.jpg',
      type: 'image'
    },
    {
      id: 61,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/xian-museum-budda2.JPG',
      thumbnailUrl: 'assets/camera/xian-museum-budda2.JPG',
      type: 'image'
    },
    {
      id: 62,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/xian-museum-hanfu-girl.JPG',
      thumbnailUrl: 'assets/camera/xian-museum-hanfu-girl.JPG',
      type: 'image'
    },
    {
      id: 63,
      title: '',
      caption: '',
      imageUrl: 'assets/camera/zhai-ju.JPG',
      thumbnailUrl: 'assets/camera/zhai-ju.JPG',
      type: 'image'
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService) {}

  ngOnInit() {
    this.cameraContent.sort((a, b) => a.id - b.id);
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

  openModal(content: CameraContent) {
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedContent = null;
  }
}