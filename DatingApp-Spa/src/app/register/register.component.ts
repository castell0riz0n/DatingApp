import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model).subscribe(() => {
      this.alertify.success('registeration successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
