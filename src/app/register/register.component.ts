import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private httpClient:HttpClient) { }
  email = '';
  password = '';
  confirmPassword = '';

  //passwordError: boolean;
  //  constructor(public userService: UsersService) {}

  ngOnInit(): void {
  }

  registerUser(user: object): Observable<any> {
    console.log('Recibi el objeto bien',user);
    let url = 'http://localhost:3000/api/register';
    return this.httpClient.post(url, user);
  }

  register() {
    const user = { email: this.email, password: this.password };
    this.registerUser(user).subscribe(
      ( data) => {
        console.log('Data:', data);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('error:', error);
      }
    );
    /*this.userService.register(user).subscribe(data => {
      console.log(data);
    });*/
  }

}
