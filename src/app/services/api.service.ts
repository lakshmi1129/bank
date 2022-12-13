import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




// function overloading for headers to append token
const options ={
  headers: new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // Search box element
  search =new BehaviorSubject("")

  constructor(private http: HttpClient) { }

  // api call to login
  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', body)
  }

  
  // api call to register
  register(acno: any, pswd: any, usrname:any) {
    const body = {
      acno,
      pswd,
      usrname
    }
    return this.http.post('http://localhost:3000/register', body)
  }
  

  // function to append token in the request headers
  appendToken(){
      const token =localStorage.getItem("token")
      let headers = new HttpHeaders()
      if(token){
        headers = headers.append('x-token',token)
        options.headers =headers
    }
    return options
  }

  // api call to deposit
  deposit(acno: any, pswd: any, amount:any) {
    const body = {
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', body,this.appendToken())
  }




// api call for withdraw
withdraw(acno: any, pswd: any, amount:any) {
  const body = {
    acno,
    pswd,
    amount
  }
  return this.http.post('http://localhost:3000/withdraw', body,this.appendToken())
}





// get Balance

balance(acno:any){
  const body={
    acno
  }
return this.http.post('http://localhost:3000/getbalance', body,this.appendToken())
}



// transaction

transaction(acno:any){
  const body={
    acno
  }
return this.http.post('http://localhost:3000/getTransaction', body,this.appendToken())
}


// delete an account
deleteAcno(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcno/'+acno,this.appendToken())
}

}
