import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock authentication - in production, this would check against a real database
    if (email && password) {
      return NextResponse.json(
        {
          access_token:
            "mock_access_token_" + Math.random().toString(36).substr(2, 9),
          refresh_token:
            "mock_refresh_token_" + Math.random().toString(36).substr(2, 9),
          token_type: "bearer",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { detail: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { detail: "Authentication failed" },
      { status: 500 }
    );
  }
}
