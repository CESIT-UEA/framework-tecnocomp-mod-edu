import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent {
  @Input() referencias!: any[];
  @Output() referenciasClick = new EventEmitter<void>();
}
