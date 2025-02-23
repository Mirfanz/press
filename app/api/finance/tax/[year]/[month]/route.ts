import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db, users } from "@/lib/appwrite-admin";
import { TaxType, UserType } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ year: string; month: string }> }
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

    if (result.users.length || result.paidUsers.length) {
      const newUsers: UserType[] = [];
      const newPaidUsers: UserType[] = [];
      await users
        .list([
          Query.contains("$id", [...result.users, ...result.paidUsers]),
          Query.limit(50),
        ])
        .then((data) => {
          data.users.forEach(({ $id, name, labels, prefs, status }) => {
            result.users.includes($id)
              ? newUsers.push({ $id, name, labels, prefs, status })
              : newPaidUsers.push({ $id, name, labels, prefs, status });
          });
        });
      data.users = newUsers;
      data.paidUsers = newPaidUsers;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 400 });
  }
}
