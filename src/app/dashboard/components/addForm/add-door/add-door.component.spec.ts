import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoorComponent } from './add-door.component';

describe('AddDoorComponent', () => {
  let component: AddDoorComponent;
  let fixture: ComponentFixture<AddDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
