import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthUser, User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  err: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe(
      data => {
        this.err = undefined
        this.authService.setSession(data.token);
        const user = new User(data.email);
        this.router.navigateByUrl('/');
      },
      err => {
        this.err = "Incorrect email or password!";
      }
    )
  }

}
