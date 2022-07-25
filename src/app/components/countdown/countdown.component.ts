import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
days:number = 194
hours:number= 22
mins:number = 14
secs:number = 4

  constructor() { }

  ngOnInit(): void {

  }
  x = setInterval(()=>{
    var futureDate = new Date("Jan 4,2023 15:34:24").getTime(); // Tue Jan 04 2022
    var today = new Date().getTime(); // Wed Jun 23 2021 18:23:45 GMT+0530 (India St
    var distance = futureDate - today;
    this.days= Math.floor(distance / (1000 *60 *60*24)); //193days 24hours 50min =
    this.hours = Math.floor((distance % (1000*60* 60 *24)) / (1000 * 60 * 60));
    this.mins = Math.floor((distance % (1000* 60*60)) / (1000 * 60));
    this.secs = Math.floor((distance % (1000 *60)) / (1000));
    if(distance < 0){
    clearInterval(this.x);
    }
    }, 1000)

}
