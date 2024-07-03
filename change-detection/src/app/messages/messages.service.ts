// using zone without signals
// import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class MessagesService {
//   messages$ = new BehaviorSubject<string[]>([]);
//   // private messages = signal<string[]>([]);
//   private messages: string[] = [];
//   // allMessages = this.messages.asReadonly();
//   get allMessages() {
//     return [...this.messages];
//   }

//   addMessage(message: string) {
//     this.messages = [...this.messages, message];
//     // this.messages.update((prevMessages) => [...prevMessages, message]);
//     this.messages$.next([...this.messages]);
//   }
// }

// using signals without zone
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
