
import nodemailer from "nodemailer"

export const emailTransporter = (): any => {

return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "29c023d298c4ba",
      pass: "7207ba67404426"
    }
  });


}