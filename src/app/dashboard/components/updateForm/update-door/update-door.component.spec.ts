import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoorComponent } from './update-door.component';

describe('UpdateDoorComponent', () => {
  let component: UpdateDoorComponent;
  let fixture: ComponentFixture<UpdateDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDoorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
