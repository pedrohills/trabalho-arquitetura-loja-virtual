import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from './shared/models/alert';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = false;

  constructor(public accountService: AccountService, private router: Router) { }

  sair() {
    this.isLoading = true;
    this.accountService.logout()
      .subscribe(data => {
        this.isLoading = false;
        this.accountService.deleteUser();
        setTimeout(() => {
          this.router.navigateByUrl("/");
        }, 3000);
        console.log(data);
      }, data => {
        this.isLoading = false;
        console.error(data);
      });
  }

}
