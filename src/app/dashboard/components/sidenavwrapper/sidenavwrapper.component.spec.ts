import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavwrapperComponent } from './sidenavwrapper.component';

describe('SidenavwrapperComponent', () => {
  let component: SidenavwrapperComponent;
  let fixture: ComponentFixture<SidenavwrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavwrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
