import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceMatComponent } from './dance-mat.component';

describe('DanceMatComponent', () => {
  let component: DanceMatComponent;
  let fixture: ComponentFixture<DanceMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanceMatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanceMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
