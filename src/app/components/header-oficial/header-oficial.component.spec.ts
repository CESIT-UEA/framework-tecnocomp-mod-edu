import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOficialComponent } from './header-oficial.component';

describe('HeaderOficialComponent', () => {
  let component: HeaderOficialComponent;
  let fixture: ComponentFixture<HeaderOficialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderOficialComponent]
    });
    fixture = TestBed.createComponent(HeaderOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
