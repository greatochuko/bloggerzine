import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  // Check if request url matches login or signup routes
  if (request.url.includes("/login") || request.url.includes("/signup")) {
    // Fetch user
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user is authenticated redirect to the redirect param or the homepage
    if (user) {
      const redirectTo = request.url.split("?redirect=%2F")[1];
      const origin = request.nextUrl.origin;

      if (redirectTo) {
        return NextResponse.redirect(`${origin}/${redirectTo}`);
      } else {
        return NextResponse.redirect(origin);
      }
    }
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
