import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  eMsg=""
  accNO=""
  user=""
  balance=""


  depositForm= this.fb.group({
    amount:['',[Validators.required, Validators.pattern('[0-9]*')] ],
    acno:['',[Validators.required, Validators.pattern('[0-9]*')] ],
    pswd:['', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      console.log(localStorage.getItem("username"));
      
      this.user = localStorage.getItem("username") || ""
    }
    
  }


  deposit(){
    if(this.depositForm.valid){

      let acno =this.depositForm.value.acno
      let pswd =this.depositForm.value.pswd
      let amount = this.depositForm.value.amount


      // Asynchronous function call register is a api service function
      this.api.deposit(acno,pswd,amount)
      .subscribe(
        // response 200
         (result:any)=>{


          this.accNO=result.acno

         console.log(result);
         alert(result.message)
         this.depositForm .reset()
      },
      // response 4XX
      (result:any)=>{
        this.accNO=result.acno

        console.log(result.error.message);
        
        this.eMsg =result.error.message
        // alert(result.error.message)
        
       }
       )
     
    }
    else{
      alert('Invalid Form')
    }
    
    
    
  }

  getBalance(){
    if(localStorage.getItem("currentAcno")){
   var acno=  localStorage.getItem("currentAcno")
   this.api.balance(acno)
   .subscribe((result:any)=>{
    // response 200 series
    this.balance =result.message

    // response error

    this.balance=result.error.message



   })
    }

  }


  

}
