import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  // to receive values from  parent use input in child
 @Input() item:string | undefined
 @Input() serverMsg:string | undefined


// to sent values from child to parent use output in child
// onCancel is a user defined event defined using event emitter
@Output() onCancel = new EventEmitter()
@Output() onDelete =new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  // cancel/ no button work
  cancel(){
    // occur the onCancel event here using emit
    this.onCancel.emit()
  }


  deleteChild(){
    this.onDelete.emit(this.item)
    let deleteConfirm = true
    this.onDelete.emit([this.item,deleteConfirm])
    this.item=""
  }

}
