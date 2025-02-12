import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db } from "@/lib/appwrite-admin";
import { TaxType } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const result = await db.listDocuments(appwriteConfig.db_id, "tax", [
      Query.orderDesc("code"),
    ]);

    const data: TaxType[] = result.documents.map(
      ({ $id, $createdAt, $updatedAt, code, users, month, year }) => ({
        $id,
        code,
        users,
        year,
        month,
        $createdAt,
        $updatedAt,
      }),
    );

    return NextResponse.json({
      success: true,
      total: result.total,
      data,
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
