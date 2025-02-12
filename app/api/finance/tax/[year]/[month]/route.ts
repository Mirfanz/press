import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db, users } from "@/lib/appwrite-admin";
import { TaxType } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ year: string; month: string }> },
) {
  try {
    const { year, month } = await params;

    const result = (
      await db.listDocuments(appwriteConfig.db_id, "tax", [
        Query.equal("year", parseInt(year)),
        Query.equal("month", parseInt(month)),
      ])
    ).documents[0];

    if (!result) throw new Error("Tax Not Found");

    const data: TaxType<true> = {
      $id: result.$id,
      code: result.code,
      paidUsers: [],
      users: [],
      year: result.year,
      month: result.month,
      $createdAt: result.$createdAt,
      $updatedAt: result.$updatedAt,
    };

    if (result.users.length)
      data.users = (
        await users.list([Query.contains("$id", result.users), Query.limit(50)])
      ).users.map(({ $id, name, labels, prefs, status }) => ({
        $id,
        name,
        labels,
        prefs,
        status,
      }));

    if (result.paidUsers.length) {
      data.paidUsers = (
        await users.list([
          Query.contains("$id", result.paidUsers),
          Query.limit(50),
        ])
      ).users.map(({ $id, name, labels, prefs, status }) => ({
        $id,
        name,
        labels,
        prefs,
        status,
      }));
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 400 });
  }
}
