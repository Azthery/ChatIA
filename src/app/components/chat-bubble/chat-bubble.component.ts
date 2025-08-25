import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss',
  standalone: true
})
export class ChatBubbleComponent {

  @Input() public sender: string = '';

}
