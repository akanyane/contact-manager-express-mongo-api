import asyncHandler from "express-async-handler";
import Contact from "../models/contact.model";

const getContact = asyncHandler (async (request, response) => {
  const contact = await Contact.findById(request.params.id);

  if(!contact) {
    response.status(404);
    throw new Error("Contact not found");
  };

  response
    .status(200)
    .json(contact)
});

const getContacts = asyncHandler (async (request, response) => {
  const contacts = await Contact.find({ user_id : request.user!.id });
  response
    .status(200)
    .json(contacts)
});

const createContact = asyncHandler (async (request, response) => {
  const { name, email, phone } = request.body;
  if(!name || !email || !phone) {
    response.status(400);
    throw new Error("All fields are mandatory");
  };

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: request.user!.id,
  });

  response
    .status(201)
    .json(contact)
});

const updateContact = asyncHandler (async (request, response) => {
  const contact = await Contact.findById(request.params.id);
  
  if(!contact) {
    response.status(404);
    throw new Error("Contact not found");
  };

  if(contact.user_id.toString() !== request.user!.id) {
    response.status(403);
    throw new Error("User does not have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      returnDocument: "after",
    }
  );

  response
    .status(200)
    .json(updatedContact);
});

const deleteContact = asyncHandler (async (request, response) => {
  const contact = await Contact.findById(request.params.id);
  
  if(!contact) {
    response.status(404);
    throw new Error("Contact not found");
  };

  if(contact.user_id.toString() !== request.user!.id) {
    response.status(403);
    throw new Error("User does not have permission to delete other user contacts");
  }

  await Contact.deleteOne({ _id: request.params.id });
  response
    .status(200)
    .json(contact)
});


export {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
