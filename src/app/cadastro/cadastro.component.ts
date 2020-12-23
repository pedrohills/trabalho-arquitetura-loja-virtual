import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../shared/models/alert';
import { AccountService } from '../shared/services/account.service';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  isLoading = false;
  alert: Alert = { show: false };
  form: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

    let email = new FormControl("", [Validators.required, Validators.email]);
    let password = new FormControl("", Validators.required);
    let password_confirm = new FormControl("", CustomValidators.equalTo(password));

    this.form = new FormGroup({
      email,
      password,
      password_confirm,
    });
  }

  signup() {
    if(this.form.valid) {
      this.isLoading = true;
      this.alert.show = false; 
      this.accountService.signup(this.form.value.email, this.form.value.password, this.form.value.password_confirm)
        .subscribe(data => {
          this.isLoading = false;
          console.log(data);
          setTimeout(() => {
            this.router.navigateByUrl("/");
          }, 3000);
        }, data => {
          this.isLoading = false;

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

  checkPasswords() {
    let password = this.password.value;
    let password_confirm = this.password_confirm.value;

    return password === password_confirm ? null : { notSame: true }     
  }
  
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get password_confirm() { return this.form.get('password_confirm'); }
}
