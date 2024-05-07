
import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  userQuery: string = '';
  botResponse: string = '';
  chatHistory: any[] = [];

  constructor(private chatService: ChatService) { }

  sendQuery() {
    // @ts-ignore
    this.chatService.getBotResponse(this.userQuery).subscribe(response => {
      this.botResponse = response.result;
      this.chatHistory.push({ user: 'bot', text: this.botResponse });
      this.userQuery = ''; // Clear user input after sending query
    });
  }
}
