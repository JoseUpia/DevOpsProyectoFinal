import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerTabComponent } from './trailer-tab.component';

describe('TrailerTabComponent', () => {
  let component: TrailerTabComponent;
  let fixture: ComponentFixture<TrailerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
