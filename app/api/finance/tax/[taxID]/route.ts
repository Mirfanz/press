import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db, users } from "@/lib/appwrite-admin";
import { TaxType } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ taxID: string }> },
) {
  try {
    const { taxID } = await params;

    console.log("params", taxID);

    const result = await db.getDocument(appwriteConfig.db_id, "tax", taxID);

    const data: TaxType<true> = {
      $id: result.$id,
      code: result.code,
      users: [],
      year: parseInt(result.$id.split(".")?.[0]),
      month: parseInt(result.$id.split(".")?.[1]),
      $createdAt: result.$createdAt,
      $updatedAt: result.$updatedAt,
    };

    if (result.users.length) {
      const result2 = await users.list([Query.contains("$id", result.users)]);

      data.users = result2.users.map(({ $id, name, labels, prefs }) => ({
        $id,
        name,
        labels,
        prefs,
      }));
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 400 });
  }
}
