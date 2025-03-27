import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBotoesSectionComponent } from './video-botoes-section.component';

describe('VideoBotoesSectionComponent', () => {
  let component: VideoBotoesSectionComponent;
  let fixture: ComponentFixture<VideoBotoesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoBotoesSectionComponent]
    });
    fixture = TestBed.createComponent(VideoBotoesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
