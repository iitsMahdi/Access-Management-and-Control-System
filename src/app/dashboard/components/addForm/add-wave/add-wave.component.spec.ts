import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaveComponent } from './add-wave.component';

describe('AddWaveComponent', () => {
  let component: AddWaveComponent;
  let fixture: ComponentFixture<AddWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
