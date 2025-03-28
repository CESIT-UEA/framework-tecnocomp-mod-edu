import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesGeraisModuloComponent } from './informacoes-gerais-modulo.component';

describe('InformacoesGeraisModuloComponent', () => {
  let component: InformacoesGeraisModuloComponent;
  let fixture: ComponentFixture<InformacoesGeraisModuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacoesGeraisModuloComponent]
    });
    fixture = TestBed.createComponent(InformacoesGeraisModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
