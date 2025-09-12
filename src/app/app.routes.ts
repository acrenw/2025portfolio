import { Routes } from '@angular/router';
import { HomeSceneComponent } from './home-scene/home-scene.component';

export const routes: Routes = [
    { path: '', component: HomeSceneComponent },
    { path: 'piano', loadComponent: () => import('./pages/piano/piano.component').then(m => m.PianoComponent) },
    { path: 'camera', loadComponent: () => import('./pages/camera/camera.component').then(m => m.CameraComponent) },
    { path: 'bookshelf', loadComponent: () => import('./pages/bookshelf/bookshelf.component').then(m => m.BookshelfComponent) },
    { path: 'guitar', loadComponent: () => import('./pages/guitar/guitar.component').then(m => m.GuitarComponent) },
    { path: 'awards', loadComponent: () => import('./pages/awards/awards.component').then(m => m.AwardsComponent) },
    { path: 'dance-mat', loadComponent: () => import('./pages/dance-mat/dance-mat.component').then(m => m.DanceMatComponent) },
    { path: 'pc', loadComponent: () => import('./pages/pc/pc.component').then(m => m.PcComponent) },
    { path: 'easel', loadComponent: () => import('./pages/easel/easel.component').then(m => m.EaselComponent) },
];
