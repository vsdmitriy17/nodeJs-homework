const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require("nanoid"); // Версия 3.3.4 - для работы с CommonJS (npm i nanoid@3.3.4)

const contactsPath = path.join(__dirname, "contacts.json");

async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
        return null;
    };
    const [deleteContact] = contacts.splice(idx, 1);
    await writeContacts(contacts);
    return deleteContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
}

async function updateContacById(id, name, email, phone) {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    };
    contacts[idx] = {
        id,
        name,
        email,
        phone
    };
    await writeContacts(contacts);
    return contacts[idx];
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContacById,
    removeContact,
};
