import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  title = 'iniciando';
  email = '';
  password = '';
  image = 'assets/images/error.png';

  constructor(private httpClient: HttpClient, private router: Router, public dialog: MatDialog) {
    console.log('LoginComponent constructor');
  }


  loginUser(user: object): Observable<any> {
    let url = 'http://localhost:3000/api/login';
    return this.httpClient.post(url, user);
  }


  login() {
    const user = { email: this.email, password: this.password };
    this.loginUser(user).subscribe(
      ( data) => {
        localStorage.setItem('data_user', JSON.stringify(data));
        this.router.navigate(['/acta-lista']);
      },
      (error) => {
        setTimeout(() => {
          this.openDialog(error);
          this.image = 'assets/images/error.png';
        }, 1000);
      }
    )
  }

  openDialog(error: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: error
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  image: any;
  constructor( public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

