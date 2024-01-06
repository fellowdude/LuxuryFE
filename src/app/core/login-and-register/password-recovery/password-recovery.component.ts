import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  recoveryForm: FormGroup;

  constructor(private router: Router) {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  return() {
    this.router.navigate(['login'])
  }

  login(){}

}
