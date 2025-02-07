import { ID, Query } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";

import { appwriteConfig } from "@/config/appwrite";
import { db } from "@/lib/appwrite-admin";

export async function GET() {
  try {
    const result = await db.listDocuments(
      appwriteConfig.db_id,
      "financial_report",
      [Query.orderDesc("date")],
    );

    return NextResponse.json({
      success: true,
      data: result.documents,
      total: result.total,
    });
  } catch (err) {
    console.log("err", err);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("data", data);

    const result = await db.createDocument(
      appwriteConfig.db_id,
      "financial_report",
      ID.unique(),
      {
        label: data.label,
        income: data.income,
        amount: data.amount,
        date: new Date(data.date),
      },
    );

    console.log("create report result", result);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("data", data);

    const result = await db.deleteDocument(
      appwriteConfig.db_id,
      "financial_report",
      data.id,
    );

    console.log("delete report result", result);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
