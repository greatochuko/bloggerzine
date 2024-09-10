import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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
    const { data, error } = await supabase
      .from("users")
      .update({ emailVerified: true })
      .eq("email", email)
      .select();
    if (error) {
      throw error;
    }

    const token = jwt.sign(
      {
        userId: data[0].id,
      },
      process.env.JWT_SECRET!
    );

    cookies().set("token", token, {
      maxAge: 3600,
      httpOnly: true,
    });

    return Response.redirect(url.origin);
  } catch (err) {
    const error = err as Error;
    return Response.redirect(
      `${url.origin}/confirm-email-error?token=${token}`
    );
  }
}
