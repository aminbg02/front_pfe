import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:5000/get_response'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBotResponse(userQuery: string) {
    return this.http.post<any>(this.apiUrl, { user_query: userQuery });
  }
}
