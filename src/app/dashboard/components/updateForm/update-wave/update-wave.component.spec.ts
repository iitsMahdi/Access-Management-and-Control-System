import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWaveComponent } from './update-wave.component';

describe('UpdateWaveComponent', () => {
  let component: UpdateWaveComponent;
  let fixture: ComponentFixture<UpdateWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
