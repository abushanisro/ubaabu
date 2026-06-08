import { NextRequest, NextResponse } from "next/server";

// TODO: Add rate limiting (e.g. upstash/ratelimit) before connecting real auth.
// TODO: Connect to your auth backend (Supabase, NextAuth, Clerk, custom JWT, etc.)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // TODO: Replace with real credential verification against your database.
    // IMPORTANT: Always return a GENERIC error regardless of whether the email
    // doesn't exist OR the password is wrong — prevents user enumeration (OWASP A07).
    // IMPORTANT: Never log passwords. Compare against bcrypt/argon2 hashed values only.

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/sign-in]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
