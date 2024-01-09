import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiProvider } from '../../providers/api.prov';
import { NavComponent } from '../../shared/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private apiProv: ApiProvider, private fb: FormBuilder) {
    /*if(apiProv.isAuthenticatedUser()){
      window.location.href = '/dashboard'
    }*/
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  email: string = '';
  password: string = '';

  public login() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl) {
        const data = {
          email: emailControl.value,
          password: passwordControl.value,
        };

        this.apiProv.login(data).then((res) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            window.location.href = '/dashboard';
            this.loginForm.reset();
          }
        });
      }
    } else {
      alert('Ingresa un correo y una contraseña válidos');
    }
  }
}
