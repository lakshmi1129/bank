import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // Login form -reactive form
  loginForm= this.fb.group({
    // validators used
    acno:['',[Validators.required, Validators.pattern('[0-9]*')] ],
    pswd:['', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]]
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  

  login(){

    // complete Form validation
    if(this.loginForm.valid){
      let acno =this.loginForm.value.acno
      let pswd =this.loginForm.value.pswd


      alert("login Sucessfull")
     
    }
    else{
      alert('Invalid Form')
    }
    
    
    
  }

}
