import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateControllerComponent } from './update-controller.component';

describe('UpdateControllerComponent', () => {
  let component: UpdateControllerComponent;
  let fixture: ComponentFixture<UpdateControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
