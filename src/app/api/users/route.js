import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import {
  saveUserController,
  getAllUsersController,
  deleteUserController,
} from "@/controllers/userController";

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();
  const result = await saveUserController(name);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

export async function GET() {
  await connectDB();
  const users = await getAllUsersController();
  return NextResponse.json(users);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const result = await deleteUserController(id);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
