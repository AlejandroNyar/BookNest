import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error = '';
  form:FormGroup;
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  onSubmit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err.error?.message || 'Login failed',
    });
  }
}
