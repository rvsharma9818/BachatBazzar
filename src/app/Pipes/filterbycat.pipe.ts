import {  Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbycat'
})
export class FilterbycatPipe implements PipeTransform {

  transform(value : any[], filterString: string,): any[] {
    const result:any =[];
    if(!value || filterString===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a['category']['_id'] == filterString){
        result.push(a);
      }
    });
    return result;
  }

}
