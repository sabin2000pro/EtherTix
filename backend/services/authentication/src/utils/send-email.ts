
import nodemailer from 'nodemailer';
require('dotenv').config();

export const emailTransporter = () => {

return nodemailer.createTransport({

    host: <any>'smtp.mailtrap.io' as any,

    port: process.env.SMTP_PORT,

    auth: {
      user: "ef8f21393bb3ed",
      pass: "bb1318de95aa3f"
    }

    
  });


}