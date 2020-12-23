import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '../shared/models/alert';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  alert: Alert = { show: false };
  form: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  signin() {
    if(this.form.valid) {
      this.isLoading = true;
      this.alert.show = false; 
      this.accountService.signin(this.form.value.email, this.form.value.password)
        .subscribe(data => {
          this.isLoading = false;
          this.accountService.setUser(data['data']);
          this.alert.show = true;
          this.alert.class = data['class'];
          this.alert.message = data['message'];
          this.form.reset();
          setTimeout(() => {
            this.router.navigateByUrl("/");
          }, 3000);
          console.log(data);
        }, data => {
          this.isLoading = false;
          this.form.controls.password.reset();

          if(data.hasOwnProperty("error")) {
            this.alert.show = true;
            this.alert.class = data.error.class;
            this.alert.message = data.error.message;
          } else {
            this.alert.show = true;
            this.alert.class = "danger";
            this.alert.message = "Um erro genérico aconteceu, tente novamente mais tarde.";
          }
          console.error(data);
        });
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
