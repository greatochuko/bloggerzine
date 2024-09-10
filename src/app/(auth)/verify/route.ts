import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const emailToken = url.searchParams.get("email_token");
  const jwtSecret = process.env.JWT_SECRET;
  try {
    if (!emailToken || !jwtSecret) throw new Error("Invalid token");
    const payload = jwt.verify(emailToken, jwtSecret);
    if (typeof payload === "string") throw new Error("Unable to verify token");
    const email = payload.email;

    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ emailVerified: true })
      .eq("email", email);
    if (error) {
      throw error;
    }

    return Response.redirect(url.origin);
  } catch (err) {
    const error = err as Error;
    return Response.redirect(
      `${url.origin}/confirm-email-error?token=${token}`
    );
  }
}
