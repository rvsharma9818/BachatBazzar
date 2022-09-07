import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public contactsevice:ContactService,    private toast: NgToastService
    ) { }

  ngOnInit(): void {
  }
contactform = new FormGroup({
  name:new FormControl('',[Validators.required]),
  email: new FormControl('', [Validators.required,Validators.email,Validators.pattern(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/),]),
  phone: new FormControl('', [ Validators.required,Validators.minLength(10),Validators.maxLength(10),]),
  Subject:new FormControl('',[Validators.required]),
  message:new FormControl('',[Validators.required]),
})
get f() {
  return this.contactform.controls;
}
sendmessage(){
  this.contactsevice.postcontact(this.contactform.value).subscribe((res)=>{
    this.contactform.reset();

    this.toast.success({
      detail: 'Success',
      summary: `Message Successfully send`,
      duration: 5000,
    });  },err=>{
    this.toast.error({
      detail: 'WARNING',
      summary: `${err.error.message}`,
      duration: 5000,
    });
  })
}

}
