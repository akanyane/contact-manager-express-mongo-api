import express from "express";
import { getContacts, getContact, updateContact, createContact, deleteContact } from "../controllers/contact.controller";
import validateToken from "../middlewares/validateTokenHandler";

const router = express.Router();

router.use(validateToken);

router.route("/")
  .get(getContacts)
  .post(createContact);

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;
