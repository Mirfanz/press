import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Account, Client } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";

export async function POST() {
  try {
    const cookie = await cookies();
    const session = cookie.get("session")?.value;

    if (!session) {
      throw new Error("Session not found");
    }

    const client = new Client()
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setSession(session);

    const account = new Account(client);

    account.client.setSession(session);
    cookie.delete("session");
    await account.deleteSession("current");

    return NextResponse.json(
      { success: true, message: "Logout Success" },
      { status: 200 },
    );
  } catch (e: any) {
    console.log("LOGIN ERROR: ", e.message);

    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 },
    );
  }
}
