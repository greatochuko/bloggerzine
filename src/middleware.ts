import { NextResponse, type NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/signup",
  "/confirm-email",
  "/confirm-email-error",
];

const protectedRoutes = [
  "/update-password",
  "/create-post",
  "/edit-post",
  "/dashboard",
  "/settings",
];

export async function middleware(request: NextRequest) {
  // update user's auth session
  const url = new URL(request.url);
  const token = request.cookies.get("token")?.value;
  if (token && authRoutes.includes(url.pathname)) {
    const redirectTo = url.searchParams.get("redirect") || "";
    return NextResponse.redirect(url.origin + redirectTo);
  }

  if (!token && protectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(
      url.origin + `/login?redirect=${url.pathname}`
    );
  }

  return NextResponse.next();
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
