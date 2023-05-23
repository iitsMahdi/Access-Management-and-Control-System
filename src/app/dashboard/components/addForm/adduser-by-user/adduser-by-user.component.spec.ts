import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserByUserComponent } from './adduser-by-user.component';

describe('AdduserByUserComponent', () => {
  let component: AdduserByUserComponent;
  let fixture: ComponentFixture<AdduserByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
