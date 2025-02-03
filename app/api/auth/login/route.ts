import { account } from "@/lib/appwrite-admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const cookie = await cookies();

  try {
    if (!email || !password) throw new Error("Email atau password harus diisi");

    const session = await account.createEmailPasswordSession(email, password);
    const res = NextResponse.json(
      { success: true, message: "Login berhasil", secret: session.secret },
      { status: 200 }
    );

    res.cookies.set("session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return res;
  } catch (e: any) {
    console.log("LOGIN ERROR: ", e.message);
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 }
    );
  }
}
