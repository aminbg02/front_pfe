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
  userInputHistory: string[] = [];

  constructor(private chatService: ChatService) { }

  formatJobList(string: string): string[] {
    // Remove "**" characters
    let formattedString = string.replace(/\*\*/g, '');

    // Split the string into individual job opportunities
    let jobOpportunities = formattedString.split('*').map(item => item.trim()).filter(item => item !== '');

    return jobOpportunities;
  }


  sendQuery() {
    this.chatService.getBotResponse(this.userQuery).subscribe(response => {
      this.botResponse = response.result;
      console.log(this.botResponse);
      // @ts-ignore
      this.botResponse=this.formatJobList(this.botResponse);
      this.chatHistory.push({ user: 'user', text: this.userQuery });
      this.chatHistory.push({ user: 'bot', text: this.botResponse });
      this.userInputHistory.push(this.userQuery);
      this.userQuery = ''; // Clear user input after sending query
    });
  }
}

