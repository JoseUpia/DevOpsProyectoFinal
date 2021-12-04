import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorTabComponent } from './director-tab.component';

describe('DirectorTabComponent', () => {
  let component: DirectorTabComponent;
  let fixture: ComponentFixture<DirectorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
