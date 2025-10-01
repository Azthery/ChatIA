import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface OllamaResponse {
  response: string;
  // ... otras propiedades que tenga la respuesta de la API
}
@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  public API_URL: string = 'http://localhost:11434/api';
  private readonly modelName = 'deepseek-r1';

  constructor(private http: HttpClient) {}

  public getMessages(): Observable<any> {
    return this.http.get(`${this.API_URL}/messages`);
  }
  public postMessage(message: string): Observable<OllamaResponse> {
    const context = {
      model: this.modelName,
      prompt: message,
      stream: false,
    };
    return this.http
      .post<OllamaResponse>(`${this.API_URL}/generate`, context, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error al llamar a la API de Ollama', error);
    // Puedes personalizar el mensaje de error o devolver un valor por defecto
    return throwError(() => new Error('Error al comunicarse con Ollama'));
  }

  public setApiKey(apiKey: string): void {
    const host = 11434;
    this.API_URL = `http://${apiKey}:${host}/api`;
  }

  public formatResponseAPI(text: string): { think: string; responseText: string } {
    const startTag = "<think>";
    const endTag = "</think>";
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag);

    const think = text.substring(startIndex + startTag.length, endIndex);
    const responseText = text.substring(endIndex + endTag.length);

    return {  think, responseText };
  }

}
