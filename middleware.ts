import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Skip static files, images, and public assets
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|webm)).*)",
  ],
};
