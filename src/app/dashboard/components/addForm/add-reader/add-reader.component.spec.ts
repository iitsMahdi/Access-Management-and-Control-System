import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReaderComponent } from './add-reader.component';

describe('AddReaderComponent', () => {
  let component: AddReaderComponent;
  let fixture: ComponentFixture<AddReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
