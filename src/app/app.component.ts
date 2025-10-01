import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { CommonModule, NgForOf } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-root',
  imports: [ CommonModule ,InputComponent, ChatContainerComponent, ChatBubbleComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public messages: Message[] = [];
  title = 'ChatIA';
  
  @ViewChild('inputElement') inputElement: any;

  public addMessage(content: string, sender: 'user' | 'bot'): void {
    const newMessage: Message = {
      id: this.messages.length + 1,
      content,
      sender
    };
    this.messages.push(newMessage);
  }

  public sendMessage(): void {
    if(!this.inputElement) return;
    const inputValue = this.inputElement.nativeElement.value;
    this.addMessage(inputValue, 'user');
    this.clearInput();
  }

  public sendBotMessage(content: string): void {
    this.addMessage(content, 'bot');
  }

  public clearInput(): void {
    if(!this.inputElement) return;
    this.inputElement.nativeElement.value = '';
  }

}
