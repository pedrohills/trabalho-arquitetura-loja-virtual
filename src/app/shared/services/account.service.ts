import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ANOYMOUS_USER, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: any = ANOYMOUS_USER;

  constructor(private http: HttpClient) {
    this.getUser();
  }

  signin(email: string, password: string) {
    return this.http.post("/login/account/signin", {email, password});
  }

  signup(email: string, password: string, password_confirm: string) {
    return this.http.post("/login/account/signup", {email, password, password_confirm});
  }

  logout() {
    return this.http.get("/login/account/logout");
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    this.user = user;
    return user;
  }

  deleteUser() {
    this.user = ANOYMOUS_USER;
    localStorage.removeItem("user");
  }
}
