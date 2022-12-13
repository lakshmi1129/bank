import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapse = true
  user = ""
  balance = ""
  isLogout: boolean = false;
  acno = ""
  deleteMsg = ""
  eMsg=""
  confirmMsg=false


  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      console.log(localStorage.getItem("username"));

      this.user = localStorage.getItem("username") || ""
    }
    // preventing  going back to dashboard after logout
    if (!localStorage.getItem("token")) {
      alert('Please Login')
      this.route.navigateByUrl('')
    }

  }

  collapse() {
    this.isCollapse = !this.isCollapse
  }

  getBalance() {
    if (localStorage.getItem("currentAcno")) {
      var acno = localStorage.getItem("currentAcno")
      this.api.balance(acno)
        .subscribe((result: any) => {
          // response 200 series
          this.balance = result.message

          // response error

          this.balance = result.error.message
        })
    }

  }



  // logout()

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("token")
    this.isLogout = true
    setTimeout(() => {
      this.route.navigateByUrl('')

    }, 3000);

  }

  // delete deleteAcno
  deleteAcno() {
    if (localStorage.getItem('currentAcno')) {
      this.acno = localStorage.getItem('currentAcno') || ""
    }
  }

  // cancel method definition
  cancel() {
    this.acno = ""

  }

  // delete account function
  deleteParent(event: any) {
    // event is acno that should be deleted
    console.log(event);
    this.confirmMsg = event[1]
    this.api.deleteAcno(event[0])
      .subscribe(
        // response 200 series
        (result: any) => {
          this.acno=""
          localStorage.removeItem("token")
          localStorage.removeItem("username")
          localStorage.removeItem("currentAcno")
          this.deleteMsg = result.message
          //alert(this.deleteMsg)
          setTimeout(()=>{
            this.route.navigateByUrl('')
          }, 2000)
          

        },

        // response 400 series
        (result:any)=>{
          this.eMsg=result.error.message
        }
      )


  }

}
