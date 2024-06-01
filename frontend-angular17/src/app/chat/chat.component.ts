import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WsService } from '../ws.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule  } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';

type ChatMessage = {
  username: string;
  message: string;
};



// Websocket code based on https://www.c-sharpcorner.com/article/real-time-communication-made-easy-demonstrating-web-sockets-with-angular/

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CommonModule, DataViewModule, FormsModule, ScrollPanelModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  username: string = "Anonymous"
  message_text: string = "";
  connection_state: string = "Connecting.."
  receivedMessages: ChatMessage[] = [
    {"username": "Anonymous", "message": "message 1" },
    {"username": "Anonymous", "message": "message 2" },
    {"username": "Anonymous", "message": "message 3" }
  ];

  constructor(private wsService: WsService) {}

  ngOnInit(): void {
    let panel = document.getElementById("scrollpanel-chat");
    panel?.scrollTo(0, 100000);
    this.wsService.connect();
    this.wsService.connected.subscribe(() => {
      this.connection_state = "Connected!";
    });
    
    this.wsService.messageReceived.subscribe((data: string) => {
      const obj = JSON.parse(data);
      const message: ChatMessage = {"username": obj.username, "message": obj.message};
      this.receivedMessages.push(message);
    });
  }

  sendMessage(): void {
    let data: ChatMessage = {"username": this.username, "message": this.message_text };
    this.wsService.sendMessage( JSON.stringify(data) );
    this.message_text = "";
  }

  updateUsername(username: string): void {
    this.username = username;
  }

}
