import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServices} from '../auth.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthServices) { }

  islogged: boolean;

  ngOnInit() {
    this.islogged = this.auth.getStatus();
  }

  loadServer() {
    this.router.navigate(['/servers', 2, 'edit'], {queryParams: {editAllow: 1}, fragment: 'loading'});
  }


  login() {
    this.auth.login();
    this.islogged = this.auth.getStatus();

  }

  logout() {
    this.auth.logout();
    this.islogged = this.auth.getStatus();

  }

}
