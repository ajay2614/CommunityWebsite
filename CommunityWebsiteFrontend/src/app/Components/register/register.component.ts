import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  user = {
    username : '',
    password : '',
    rol : 'user',
    lastName : '',
    firstName : ''
  }
  emailregx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  checkUser : any;
  checkUser2 : any;
  confirmPassword : ''

  constructor(private registerService : RegisterService , private router : Router) { }

  ngOnInit(): void {
  }

  register(){
    if((this.user.username!='' && this.user.password!='' && this.user.firstName !='' && this.user.lastName !='' && this.confirmPassword !='') && (this.user.username!=null && this.user.password!=null && this.user.firstName !=null && this.user.lastName !=null && this.confirmPassword !=null)) {

      if(!this.user.username.match(this.emailregx)){
        alert("Please provide a valid email-id");
        return;
    }
      if(this.user.password!=this.confirmPassword){
        alert("Passwords Don't Match");
        return;
      }

    
      this.registerService.checkUser(this.user).subscribe({
        next : ((value : any)=>{
          if(value.user === 1){
            alert("User Already Exists");
            return;
          } else{
            this.registerService.registerUser(this.user).subscribe(
              {
                next: ((value : any ) => {
                console.log(value);  
                alert("User Successfully Registered");
                this.router.navigate(['home/'])
                }),
                error : () => {alert('Try Again Please')}
              }
             )
          }
        })
      });
    }else{
      alert("Please Enter all Fields");
    }
  }  
  login(){
    this.router.navigate(['login/']);
  }
}
