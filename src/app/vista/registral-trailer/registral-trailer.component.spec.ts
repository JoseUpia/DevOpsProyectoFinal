import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistralTrailerComponent } from './registral-trailer.component';

describe('RegistralTrailerComponent', () => {
  let component: RegistralTrailerComponent;
  let fixture: ComponentFixture<RegistralTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistralTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistralTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
