import { MailtrapClient } from "mailtrap";
import emailjs from "emailjs-com";

export async function sendMail(
  username: string,
  recipient: string,
  token: string
) {
  try {
    await emailjs.send(
      "service_c7zszyp",
      "template_yphek6s",
      {
        username,
        token,
        recipient,
      },
      "eOL8xJ31-4NSD1iPu"
    );
  } catch (err) {
    const error = err as Error;
    console.log("Error: ", error.message || error);
  }
}
