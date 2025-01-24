import { NextResponse, NextRequest } from "next/server";
import { Account, Client } from "node-appwrite";
import { appwriteConfig } from "./config/appwrite";

export async function middleware(request: NextRequest) {
  const mustNotLoggedIn = ["/auth/login"].includes(request.nextUrl.pathname);

  try {
    const session = request.cookies.get("session")?.value;

    if (!session) {
      if (mustNotLoggedIn) return NextResponse.next();
      else throw new Error("Unauthorized");
    }

    const client = new Client()
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setSession(session);

    const account = new Account(client);

    account.client.setSession(session);
    const user = await account.get();

    if (mustNotLoggedIn && user) {
      console.log("sudah login");
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("User not authenticated:", error);
    return NextResponse.redirect(
      new URL(
        `/auth/login?redirect_url=${encodeURIComponent(request.url)}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: ["/", "/cash/:path*", "/news/:path*", "/auth/login"], // protected routes
};
