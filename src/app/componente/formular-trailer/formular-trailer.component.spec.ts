import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularTrailerComponent } from './formular-trailer.component';

describe('FormularTrailerComponent', () => {
  let component: FormularTrailerComponent;
  let fixture: ComponentFixture<FormularTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
