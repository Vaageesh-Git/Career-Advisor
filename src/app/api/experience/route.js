import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, role, company, description, startDate, endDate } = body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const exp = await prisma.experience.create({
      data: {
        userId: user.id,
        role,
        company,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ success: true, exp });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const experiences = await prisma.experience.findMany({
      where: { userId: user.id },
      orderBy: { startDate: "desc" }
    });

    return NextResponse.json({ experiences });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { email, expId, role, company, description, startDate, endDate } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updated = await prisma.experience.updateMany({
      where: { id: expId, userId: user.id },
      data: {
        role,
        company,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null
      }
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { error: "Experience not found or doesn't belong to this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const body = await req.json();
    const { email, expId } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const deleted = await prisma.experience.deleteMany({
      where: { id: expId, userId: user.id }
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Experience not found or doesn't belong to this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}