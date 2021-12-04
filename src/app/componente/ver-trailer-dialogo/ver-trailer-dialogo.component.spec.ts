import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTrailerDialogoComponent } from './ver-trailer-dialogo.component';

describe('VerTrailerDialogoComponent', () => {
  let component: VerTrailerDialogoComponent;
  let fixture: ComponentFixture<VerTrailerDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTrailerDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTrailerDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
