import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroTabComponent } from './genero-tab.component';

describe('GeneroTabComponent', () => {
  let component: GeneroTabComponent;
  let fixture: ComponentFixture<GeneroTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneroTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
