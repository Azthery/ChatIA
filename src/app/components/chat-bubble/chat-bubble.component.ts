import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss',
  standalone: true,
  host: {
    '[class.chat-bubble--user]': 'sender === "user"',
    '[class.chat-bubble--bot]': 'sender === "bot"'
  }
})
export class ChatBubbleComponent {

  @Input() public sender: 'user' | 'bot' = 'user';

}
