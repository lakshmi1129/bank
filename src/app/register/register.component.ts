import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  eMsg=""

  // Registration form -reactive form
  registerForm= this.fb.group({
    // validators used
    usrname:['',[Validators.required, Validators.pattern('[a-z A-Z]*')] ],
    acno:['',[Validators.required, Validators.pattern('[0-9]*')] ],
    pswd:['', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }
    register(){

      // complete Form validation
      if(this.registerForm.valid){

        let usrname = this.registerForm.value.usrname
        let acno =this.registerForm.value.acno
        let pswd =this.registerForm.value.pswd

        // Asynchronous function call register is a api service function
        this.api.register(acno,pswd,usrname)
        .subscribe(
          // response 200
          (result:any)=>{
            // alert('Register Clicked')
           console.log(result);
           alert(result.message)
           this.router.navigateByUrl('')  
        },
        // response 4XX
        (result:any)=>{
          this.eMsg =result.error.message
      //     // alert(result.error.message)
          
         }
         )
       
      }
      else{
        alert('Invalid Form')
      }
      
      
      
    }






  }

