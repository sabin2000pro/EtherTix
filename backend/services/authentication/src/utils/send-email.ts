
import nodemailer from "nodemailer"

export const emailTransporter = (): any => {

return nodemailer.createTransport({

    host: "smtp.mailtrap.io",
    port: 2525,

    auth: {
      user: "ef8f21393bb3ed",
      pass: "bb1318de95aa3f"
    }

    
  });


}