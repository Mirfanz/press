import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db, users } from "@/lib/appwrite-admin";
import { CreateTax } from "@/types/database";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  )
    return NextResponse.json({ success: false }, { status: 401 });

  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const data: CreateTax = {
      year,
      month,
      paidUsers: [],
      users: ["FO0306"],
      code: year * 10 + month,
    };

    const result = await users.list([
      Query.equal("status", true),
      Query.limit(50),
    ]);

    data.users = result.users.map((u) => u.$id);

    const result2 = await db.createDocument(
      appwriteConfig.db_id,
      "tax",
      ID.unique(),
      data
    );

    console.log("result", result2);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.log("error.message", error.message);

    return NextResponse.json({ success: false }, { status: 400 });
  }
}
