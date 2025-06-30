import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatN8nComponent } from './chat-n8n.component';

describe('ChatN8nComponent', () => {
  let component: ChatN8nComponent;
  let fixture: ComponentFixture<ChatN8nComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatN8nComponent]
    });
    fixture = TestBed.createComponent(ChatN8nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
