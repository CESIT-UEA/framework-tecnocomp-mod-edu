import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloInicialComponent } from './modulo-inicial.component';

describe('ModuloInicialComponent', () => {
  let component: ModuloInicialComponent;
  let fixture: ComponentFixture<ModuloInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloInicialComponent]
    });
    fixture = TestBed.createComponent(ModuloInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
