import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transactions: any[], filterString: string, propName:any): any {
    const result:any=[]
    if(!transactions || filterString=='' || propName==''){
      return transactions
    }

    transactions.forEach((trans:any)=>{
      if(trans[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(trans)
      }
    })
    return result;
  }

}
