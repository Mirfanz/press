import { appwriteConfig } from "@/config/appwrite";
import { db } from "@/lib/appwrite-admin";
import { ScheduleType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  try {
    const result = await db.listDocuments(appwriteConfig.db_id, "schedule", [
      Query.orderDesc("$createdAt"),
    ]);
    const data: ScheduleType[] = result.documents.map((doc) => ({
      $id: doc.$id,
      label: doc.label,
      image_url: doc.image_url,
      $createdAt: doc.$createdAt,
    }));
    return NextResponse.json({ success: true, total: result.total, data });
  } catch (error: any) {
    console.log("error.message", error.message);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { label, image_url } = await req.json();
    const result = await db.createDocument(
      appwriteConfig.db_id,
      "schedule",
      ID.unique(),
      {
        label,
        image_url,
      }
    );
    console.log("result", result);
    const data: ScheduleType = {
      $id: result.$id,
      label: result.label,
      image_url: result.image_url,
      $createdAt: result.$createdAt,
    };
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.log("error.message", error.message);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
