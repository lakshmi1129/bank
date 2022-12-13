import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  eMsg=""
  msg=""
accno=""
user=""
balance=""

  withdrawForm= this.fb.group({
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


  withdraw(){
    if(this.withdrawForm.valid){

      let acno =this.withdrawForm.value.acno
      let pswd =this.withdrawForm.value.pswd
      let amount = this.withdrawForm.value.amount


      // Asynchronous function call withdraw is a api service function
       this.api.withdraw(acno,pswd,amount)
       .subscribe(
        // response 200
         (result:any)=>{
         console.log(result);
         this.msg = result.message
         setTimeout(()=>{
          this.msg=""
           alert(result.message)
          this.withdrawForm.reset()

         },1000)
      },
      // response 4XX
      (result:any)=>{
        this.eMsg =result.error.message
        setTimeout(()=>{
          this.eMsg=""
        },2000)
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
