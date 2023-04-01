import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialgAddProfileComponent } from './dialg-add-profile.component';

describe('DialgAddProfileComponent', () => {
  let component: DialgAddProfileComponent;
  let fixture: ComponentFixture<DialgAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialgAddProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialgAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
