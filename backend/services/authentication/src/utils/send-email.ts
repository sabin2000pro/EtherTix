
import nodemailer from "nodemailer"
require('dotenv').config()

export const emailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: "smtp.mailtrap.io",
  port: 2525,

  auth: {
    user: "31c4555f29ccbb",
    pass: "66af38be36d489"
  }
});


}