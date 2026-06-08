import { NextRequest, NextResponse } from "next/server";

// TODO: Add rate limiting (e.g. upstash/ratelimit) before connecting real auth.
// TODO: Connect to your auth backend (Supabase, NextAuth, Clerk, custom JWT, etc.)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, cfToken } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Server-side password length enforcement — never trust client-side only.
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // TODO: Verify Cloudflare Turnstile token (cfToken) against TURNSTILE_SECRET_KEY.
    // TODO: Check for duplicate email before inserting.
    // TODO: Hash password with bcrypt/argon2 — NEVER store plain text.
    // TODO: Insert user into database.
    // TODO: Send verification email via Resend.

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/sign-up]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
