import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public id!:any
  private storageKey = 'contacts';

  constructor() {}

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.storageKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contact.id = contacts.length ? contacts[contacts.length -1].id + 1 : 0;
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(updatedContact: Contact): void {
    let contacts = this.getContacts();
    updatedContact.id = this.id;
    contacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.saveContacts(contacts);
  }

  deleteContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter((contact) => contact.id !== id);
    this.saveContacts(contacts);
  }
}
