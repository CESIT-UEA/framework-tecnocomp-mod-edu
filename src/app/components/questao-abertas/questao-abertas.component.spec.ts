import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoAbertasComponent } from './questao-abertas.component';

describe('QuestaoAbertasComponent', () => {
  let component: QuestaoAbertasComponent;
  let fixture: ComponentFixture<QuestaoAbertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestaoAbertasComponent]
    });
    fixture = TestBed.createComponent(QuestaoAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
