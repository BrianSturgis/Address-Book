// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}



// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.addresses = [];
}

Contact.prototype.addAddress = function(address) {
  address.id = this.assignId();
  this.addresses.push(address);
}

Contact.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function Address(street, city, state, zipcode, country) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
}

Contact.prototype.fullName = function() { 
  return this.firstName + " " + this.lastName;
}

// User Interface Logic -------
let addressBook = new AddressBook ();

function displayContactDetails(addressBookToDisplay){
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + contact.emailAddress + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact (contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street-address").html(address.street);
  $(".city-address").html(address.city);
  $(".state-address").html(address.state);
  $("zip-address").html(address.zipcode);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deletebutton' id=" +  + contact.id + ">delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function()  {
    showContact(this.id); 
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-emailaddress").val();
    const inputtedStreet = $("input#new-street").val();
    const inputtedCity = $("input#new-city").val();
    const inputtedState = $("input#new-state").val();
    const inputtedZip = $("input#new-zip").val();
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedStreet, inputtedCity, inputtedState, inputtedZip);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});