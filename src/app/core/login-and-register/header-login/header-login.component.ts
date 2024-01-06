import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {

  @Input() radioModel: string = 'Left';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showLoginForm(){
    this.router.navigate(['login']);
  }

  showRegisterForm(){
    this.router.navigate(['register']);
  }

}
