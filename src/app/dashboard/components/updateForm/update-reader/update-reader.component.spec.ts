import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReaderComponent } from './update-reader.component';

describe('UpdateReaderComponent', () => {
  let component: UpdateReaderComponent;
  let fixture: ComponentFixture<UpdateReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
