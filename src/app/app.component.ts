import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) {
    if(localStorage.getItem('data_user')){
      this.router.navigate(['/acta-lista']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
