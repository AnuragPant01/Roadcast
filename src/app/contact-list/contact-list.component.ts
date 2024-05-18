import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  tableData:any = [];
  @ViewChild('dt') dt!: any; 
  infotext!: string;
  totalRecords!: number;
  deleteContact:boolean = false
  rows:number = 10;
  id!:any

  constructor(private contactService: ContactService,private router:Router,private toast:ToastrService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadContacts();
  }

  loadContacts(): void {
    this.tableData = this.contactService.getContacts();
    if(this.tableData && this.tableData.length){
      this.totalRecords = this.tableData.length
      this.setInfoText(this.totalRecords)
    }
  }

  goToForm(){
    this.router.navigateByUrl('')
  }

  onEdit(id: number): void {
    this.contactService.id = id;
    this.router.navigateByUrl('');;
  }

  closePopup(){
    this.deleteContact = false;
    this.id = null;
  }

  openDeletePopup(id:number): void {
    this.deleteContact = true
    this.id = id;
  }

  onDelete(){
    if(this.id>=0){
      this.contactService.deleteContact(this.id);
      this.toast.success('Deleted Record');
      this.deleteContact = false;
      this.loadContacts()
    }
  }

  setInfoText(totalRecords:any) {
    let count = +this.dt.rows + (+this.dt.first) > totalRecords ? totalRecords : +this.dt.rows + (+this.dt.first);
    let first = this.dt.first > totalRecords ? totalRecords : this.dt.first;
    this.infotext = `Showing ${first + 1} - ${count} of ${totalRecords} entries`

  }

}
