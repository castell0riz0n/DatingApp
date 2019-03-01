import { Component, OnInit } from '@angular/core';
import { Message } from './../models/message';
import { Pagination, PaginatedResult } from './../models/pagination';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('are you sure want to delete this message?', () => {
      this.userService
        .deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(
          () => {
            this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
            this.alertify.success('message deleted !');
          },
          error => {
            this.alertify.error('failed to delete the message');
          }
        );
    });
  }


}
