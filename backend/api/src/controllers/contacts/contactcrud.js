import { contactConst } from "../../models/contact.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import { sendEmail } from "../../../utils/emailUtility.js";
// Create a contact
export const createContact = catchAsync(async (req, res) => {
  const newContact = req.body;
  const createdContact = await contactConst.create(newContact);
  res.status(201).json({
    status: "success",
    message: "Contact created successfully",
    data: createdContact,
  });
});

// Get all contacts
export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactConst.find();
  res.status(200).json({
    status: "success",
    message: "All contacts retrieved successfully",
    data: contacts,
  });
});

// Get contact by ID
export const getContactById = catchAsync(async (req, res) => {
  const contactId = req.params.id;
  const contact = await contactConst.findById(contactId);
  if (!contact) {
    res.status(404).json({
      status: "error",
      message: "Contact not found",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "Contact retrieved successfully",
    data: contact,
  });
});

// Update contact by ID
export const updateContactById = catchAsync(async (req, res) => {
  const contactId = req.params.id;
  const updatedContact = await contactConst.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    res.status(404).json({
      status: "error",
      message: "Contact not found",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "Contact updated successfully",
    data: updatedContact,
  });
});

// Delete contact by ID
export const deleteContactById = catchAsync(async (req, res) => {
  const contactId = req.params.id;
  const deletedContact = await contactConst.findByIdAndDelete(contactId);
  if (!deletedContact) {
    res.status(404).json({
      status: "error",
      message: "Contact not found",
    });
    return;
  }
  res.status(204).json({
    status: "success",
    message: "Contact deleted successfully",
    data: null,
  });
});

// Delete all contacts
export const deleteAllContacts = catchAsync(async (req, res) => {
  await contactConst.deleteMany();
  res.status(204).json({
    status: "success",
    message: "All contacts deleted successfully",
    data: null,
  });
});

// Reply to contact by ID
export const replyToContactById = catchAsync(async (req, res) => {
  const contactId = req.params.id;
  const replyMessage = req.body.reply;
  let subject=req.body.replysubject;
  let thecontact=await contactConst.findOne({_id:contactId})
  // Assuming you have a 'reply' field in your model
  const updatedContact = await contactConst.findByIdAndUpdate(
    contactId,
    { reply: replyMessage, replydate: new Date() ,replysubject:subject},
    { new: true }
  );
let email=thecontact.email
let thename=thecontact.name

 const html=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Smart Parking System</title>

    <style>
      body {
        background-color: hsl(230, 19%, 81%); /* Light Gray */
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: hsl(210, 100%, 76%); /* Blue */
        padding: 20px;
        display: flex;
        align-items: center;
        padding: 2px 15%;
        padding-right: 25%;
        justify-content: space-between;
      }

      .header img {
        max-width: 200px;
        border-radius: 50%;
        height: auto;
        transition: all 0.3s ease-in-out; /* Add a smooth transition effect */
      }

      .header h1 {
        color: hsl(328, 100%, 59%); /* Dark Gray */
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: hsl(210, 60%, 98%); /* White */
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: hsl(60, 100%, 25%); /* Dark Gray */
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: hsl(0, 0%, 0%); /* Gray */
        font-size: 16px;
        margin: 0;
        text-align: left;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: hsl(328, 100%, 59%); /* Blue */
        color: hsl(210, 60%, 98%); /* White */
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: hsl(25, 100%, 50%); /* Darker Blue */
      }

      .footer {
        text-align: left;
        padding: 20px 5%;
        margin-top: 20px;
        font-size: 12px;
        color: hsl(0, 0%, 0%); /* Light Gray */
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a href="https://smart-parking-system.com">
        <img
          src="https://www.fablabs.io/labs/FabLabRwanda"
          alt="fablab  logo"
        />
      </a>
      <h1>fablab company</h1>
    </div>
    <div class="content">
   
      <h2>
<br />
      ${subject}
      </h2>
      <p>
        Dear ${thename ? thename: "Valued guest"},
        <br /><br />
        ${req.body.reply}
      </p><br />
    </div><br />
    <div class="footer">feeel free  to contact us for more  enquiry idea or suport<br /><br />

      Best regards,
    </div>
  </body>
</html>`

console.log("the email----------",email)

sendEmail(email, subject," we Thank you for contacting at fab lab",html)



  if (!updatedContact) {
    res.status(404).json({
      status: "error",
      message: "Contact not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Reply added successfully",
    data: updatedContact,
  });
});

