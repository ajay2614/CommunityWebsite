import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  credentials = {
    username : '',
    password : ''
  }
  constructor(private loginService : LoginService , private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)) {
    // alert("form is submitted");
    // alert(this.credentials.username);
    // alert(this.credentials.password);
       this.loginService.generateToken(this.credentials).subscribe(
        {
          next: ((value : any ) => {console.log(value.jwtToken)
          this.loginService.loginUser(value.jwtToken);
          console.log(this.loginService.getToken());
          this.loginService.findRol(this.credentials.username).subscribe({
            next : ((value:any) => {
              if(value.user === 'admin') {
                this.router.navigate(['admin/',this.credentials.username]) 
              }
              else {
                console.log('coming');
                this.router.navigate(['dashboard/',this.credentials.username]) 
              }
            })
          })
          this.router.navigate(['dashboard/',this.credentials.username])
          }),
          error : () => {alert('Please Try Again')}
        }
       )
    } else {
      alert("Enter All Fields");
    }
  }

  register() {
    this.router.navigate(['register/']);
  }
}
