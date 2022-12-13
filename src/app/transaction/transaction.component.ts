import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import  jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  user=""
  balance=""
  acno=""
  transactions:any

  // hold search term
  searchTerm =""

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      console.log(localStorage.getItem("username"));      
      this.user = localStorage.getItem("username") || ""
    }

    if(localStorage.getItem("currentAcno")){
      this.acno = localStorage.getItem("currentAcno") || ""
    }
    this.api.transaction(this.acno)
    .subscribe(
      // response 200
      (result:any)=>{
        this.transactions =result.transaction
        console.log(this.transactions);
      },
      // response 400 series
      (result:any)=>{
        alert(result.error.message)
      }
    )


    // to get search term from api service
    this.api.search.subscribe((data)=>{
      console.log(data);
      this.searchTerm =data
    })
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

  // for search
  searchterm(event:any){
    console.log(event.target.value);
    let searchKey =event.target.value
    this.api.search.next(searchKey)

    
  }


  // export pdf


  generatePdf() {
    var pdf = new jspdf();

    let col =['Transaction Type', 'Amount']
    let row:any=[]
    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);



    var itemNew =this.transactions
    console.log(itemNew);
    
    itemNew.forEach(element =>{
      var temp =[element.type,element.amount];
      console.log(temp);
      console.log(row);
      
      row.push(temp);
    });


    (pdf as any).autoTable(col,row, {startY:10 })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
}  

}

  

   
  



  


