const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contactList = await fs.readFile(contactsPath);

  return JSON.parse(contactList);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const index = contactList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return Promise.reject(`Can't find the contact ${contactId}.`);
  }
  updatedContactList = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return updatedContactList[0];
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  const contactList = await listContacts();
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
