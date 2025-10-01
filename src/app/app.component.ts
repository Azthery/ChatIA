import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { CommonModule, NgForOf } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { OllamaService } from './services/ollama/ollama.service';
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-root',
  imports: [ CommonModule, InputComponent, ChatContainerComponent, ChatBubbleComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public messages: Message[] = [];
  public disabledButtonSend: boolean = true;
  public loading: boolean = false;
  title = 'ChatIA';
  
  @ViewChild('inputElement') inputElement: any;

  constructor(private ollamaService: OllamaService) {}

  public addMessage(content: string, sender: 'user' | 'bot'): void {
    const newMessage: Message = {
      id: this.messages.length + 1,
      content,
      sender
    };
    this.messages.push(newMessage);
  }

  public onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.disabledButtonSend = inputValue.trim().length === 0;
  }

  public sendMessage(): void {
    if(!this.inputElement) return;
    const inputValue = this.inputElement.nativeElement.value;
    this.addMessage(inputValue, 'user');
    this.postMessage(inputValue);
    this.clearInput();
  }

  public sendBotMessage(content: string): void {
    this.addMessage(content, 'bot');
  }

  public clearInput(): void {
    if(!this.inputElement) return;
    this.inputElement.nativeElement.value = '';
    this.disabledButtonSend = true;
  }

  private postMessage(message: string): void {
    this.loading = true;
    this.ollamaService.postMessage(message).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('Respuesta de Ollama:', response.response);
        // Aquí puedes agregar la respuesta al array de mensajes para mostrarla en el chat
        this.addMessage(response.response, 'bot');
      },
      error: (error: any) => {
        // Manejar el error
        console.error('Error al enviar el mensaje:', error);
        // Mostrar un mensaje de error al usuario
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
