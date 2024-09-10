import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/nodejs";

export async function sendMail2(
  username: string,
  recipient: string,
  token: string
): Promise<{ done: boolean; error: string | null }> {
  try {
    await emailjs.send(
      "service_c7zszyp",
      "template_yphek6s",
      {
        username,
        token,
        recipient,
      },
      { publicKey: "eOL8xJ31-4NSD1iPu", privateKey: "kwaIfpRRFWUToaeMRMpQF" }
    );
    return { done: true, error: null };
  } catch (err) {
    const error = err as Error;
    return { done: false, error: error.message };
  }
}

export async function sendMail(
  username: string,
  recipient: string,
  token: string,
  emailToken: string
): Promise<{ done: boolean; error: string | null }> {
  try {
    const result = await emailjs.send(
      "service_3usrnk8",
      "template_5g2isin",
      {
        username,
        token,
        emailToken,
        recipient,
      },
      { publicKey: "JvRXVPlNfGP4R_4B6", privateKey: "eKJIKYk6ZhDX5LDj0uqKq" }
    );
    return { done: true, error: null };
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      return { done: false, error: err.text };
    }
    const error = err as Error;
    return { done: false, error: error.message };
  }
}
