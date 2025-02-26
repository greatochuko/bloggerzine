import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/nodejs";

export async function sendMail(
  username: string,
  recipient: string,
  token: string,
  emailToken: string
): Promise<{ done: boolean; error: string | null }> {
  try {
    await emailjs.send(
      "service_3usrnk8",
      "template_5g2isin",
      {
        username,
        token,
        emailToken,
        recipient,
        origin: process.env.NEXT_PUBLIC_ORIGIN,
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

export async function sendPasswordMail(
  username: string,
  recipient: string,
  token: string,
  emailToken: string
): Promise<{ done: boolean; error: string | null }> {
  try {
    await emailjs.send(
      "service_3usrnk8",
      "template_cbp2w4g",
      {
        username,
        token,
        emailToken,
        recipient,
        origin: process.env.NEXT_PUBLIC_ORIGIN,
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
