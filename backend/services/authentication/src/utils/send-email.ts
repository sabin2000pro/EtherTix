require('dotenv').config()
import nodemailer from "nodemailer"

export const emailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: process.env.AUTH_SERVICE_SMTP_HOST,
  port: 2525,

  auth: {
    user: process.env.AUTH_SERVICE_SMTP_USER,
    pass: process.env.AUTH_SERVICE_SMTP_PASS
  }
});


}