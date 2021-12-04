import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEditarTrailerComponent } from './dialogo-editar-trailer.component';

describe('DialogoEditarTrailerComponent', () => {
  let component: DialogoEditarTrailerComponent;
  let fixture: ComponentFixture<DialogoEditarTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoEditarTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEditarTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
