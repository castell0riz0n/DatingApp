import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  jwtHelper = new JwtHelperService();

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.auth.currentUser = user;
      this.auth.changeMemberPhoto(user.photoUrl);
    }
  }
}
