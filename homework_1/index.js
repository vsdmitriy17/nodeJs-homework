const contacts = require("./contacts");
const { Command } = require('commander');

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const option = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;

        case 'get':
            const contact = await contacts.getContactById(id);
            console.log(contact);
            break;

        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        
        case 'update':
            const updateContact = await contacts.updateContacById(id, name, email, phone);
            console.log(updateContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: "2" });
// invokeAction({ action: 'add', name: 'Vasay', email: 'vasay@mail.ru', phone: '+3800-506-50-46' });
// invokeAction({ action: 'update', id: '8qTfD6csGmiV_WXdOgP_3', name: 'Vasay_2', email: 'vasay@mail.ru', phone: '+3800-506-50-37' });
invokeAction(option);