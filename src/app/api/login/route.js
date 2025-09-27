import admin from "@/lib/firebaseAdmin";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { idToken } = req.body;

  try {
    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    res.setHeader(
      "Set-Cookie",
      serialize("session", sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expiresIn / 1000,
        path: "/",
      })
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
