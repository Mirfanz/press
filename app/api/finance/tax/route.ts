import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";
import { db } from "@/lib/appwrite-admin";
import { TaxType } from "@/types";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const result = await db.listDocuments(appwriteConfig.db_id, "tax", [
      Query.orderDesc("code"),
    ]);

    const data: TaxType[] = result.documents.map(
      ({
        $id,
        $createdAt,
        $updatedAt,
        code,
        users,
        month,
        year,
        paidUsers,
      }) => ({
        $id,
        code,
        users,
        paidUsers,
        year,
        month,
        $createdAt,
        $updatedAt,
      })
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

export async function POST(req: NextRequest) {
  try {
    const { taxId, userId } = await req.json();
    console.log("taxtId,uerId", taxId, userId);

    if (!taxId || !userId) throw new Error("Invalid request body");

    const result = await db.getDocument(appwriteConfig.db_id, "tax", taxId);

    const indexUsers = (result.users as Array<string>).indexOf(userId);
    if (indexUsers > -1) (result.users as Array<string>).splice(indexUsers, 1);

    const indexPaidUsers = (result.paidUsers as Array<string>).indexOf(userId);
    if (indexPaidUsers < 0) (result.paidUsers as Array<string>).push(userId);

    const result2 = await db.updateDocument(
      appwriteConfig.db_id,
      "tax",
      taxId,
      {
        paidUsers: result.paidUsers,
        users: result.users,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
