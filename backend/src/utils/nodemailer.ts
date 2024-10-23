"use strict";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
   host: process.env.smtpHost as string,
   port: process.env.smtpPort as string,
   secure: process.env.smtpSecure as string,
   auth: {
      user: process.env.smtpUser as string,
      pass: process.env.smtpPass as string,
   },
   tls: {
      ciphers: "SSLv3",
   },
});

export async function sendEmail(emailTo: string, subject: string, html: string) {
   try {
      const info = await transport.sendMail({
         from: process.env.mailFrom,
         to: emailTo,
         subject,
         html,
      });
      return `Mensagem enviada para: ${info.accepted}`;
   } catch (error) {
      console.error(error);
      return `Não foi possível enviar a mensagem`;
   }
}
