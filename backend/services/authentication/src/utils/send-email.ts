require('dotenv').config()
import nodemailer from "nodemailer"

export const emailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: "sandbox.smtp.mailtrap.io",
  port: 2525,

  auth: {
    user: "ef8f21393bb3ed",
    pass: "bb1318de95aa3f"
  }
});


}