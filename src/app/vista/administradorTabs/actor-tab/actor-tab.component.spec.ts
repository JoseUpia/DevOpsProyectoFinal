import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorTabComponent } from './actor-tab.component';

describe('ActorTabComponent', () => {
  let component: ActorTabComponent;
  let fixture: ComponentFixture<ActorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
