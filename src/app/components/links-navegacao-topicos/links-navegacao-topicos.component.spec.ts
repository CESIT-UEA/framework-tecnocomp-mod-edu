import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksNavegacaoTopicosComponent } from './links-navegacao-topicos.component';

describe('LinksNavegacaoTopicosComponent', () => {
  let component: LinksNavegacaoTopicosComponent;
  let fixture: ComponentFixture<LinksNavegacaoTopicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksNavegacaoTopicosComponent]
    });
    fixture = TestBed.createComponent(LinksNavegacaoTopicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
