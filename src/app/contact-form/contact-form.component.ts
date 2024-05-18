import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  isSubmitted:boolean = false;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private toast:ToastrService,private contactService:ContactService) {
  }

  ngOnInit(): void {
    this.contactFormInit();
    if(this.contactService.id){
      this.getEditData();
    }
  }

  contactFormInit(){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getEditData(){
    const contacts =  this.contactService.getContacts();
    if(contacts && contacts.length){
      const contact = contacts.filter((val:any)=> val.id == this.contactService.id)
      this.contactForm.patchValue(contact[0])
    }
  }

  goToList(){
    this.contactService.id = null
    this.router.navigateByUrl('/list')
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(!this.contactForm.valid){
      return;
    }
    const contact: Contact = this.contactForm.value;
    let msg = '';
    if(this.contactService.id){
      this.contactService.updateContact(contact)
      msg = 'Edited List Data'
    }else{
      this.contactService.addContact(contact);
      msg = 'Added To List'
    }
    this.toast.success(msg);
    this.isSubmitted = false;
    this.contactService.id = null
    this.contactForm.reset();
  }
}
