import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../../shared/nav/nav.component';
import { ApiProvider } from '../../providers/api.prov'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  RegisterForm: FormGroup;
  submitted = false;
  constructor(public apiProv:ApiProvider, public formBuilder: FormBuilder) {
    this.RegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  email: string = ''; 
  password: string = ''; 
  username:string='';

  public register(){
    this.submitted = true;
    if(this.RegisterForm.valid){
      const emailControl = this.RegisterForm.get('email');
      const passwordControl = this.RegisterForm.get('password');
      const usernameControl = this.RegisterForm.get('username');
      if(emailControl && passwordControl && usernameControl){
        const data = {
          email: emailControl.value,
          password: passwordControl.value,
          userName: usernameControl.value
        }
        this.apiProv.register(data).then(res => {
          console.log(res);
          window.location.href='/login';
          }
        );
      }
    }
  }
}
