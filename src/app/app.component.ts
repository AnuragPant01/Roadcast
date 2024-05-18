// app.component.ts
import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showContactForm: boolean = true;

  toggleContactList(): void {
    this.showContactForm = !this.showContactForm;
  }

  onSave(contact: Contact): void {
    let contacts: Contact[] = JSON.parse(
      localStorage.getItem('contacts') || '[]'
    );
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}
